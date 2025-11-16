import { useState, useEffect } from "react";
import "./ChatStream.css";
import Controller from "../Controller/Controller";
import History from "../History/History";

export default function ChatStream() {
	const [userInput, setUserInput] = useState("");
	const [controllerInput, setControllerInput] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [messages, setMessages] = useState([]);

	const [historyManager] = useState(() => new History());

	useEffect(() => {
		setMessages([
			{
				role: "assistant",
				content:
					"Welcome! My name is Atom. I'm here to assist you with booking your appointment",
				intent: "system",
			},
		]);
	}, []);

	const handleSubmit = (e) => {
		e.preventDefault();
		if (!userInput.trim() || isLoading) return;

		const input = userInput.trim();

		setMessages((prev) => [
			...prev,
			{
				role: "user",
				content: input,
				intent: "user",
			},
		]);

		 historyManager.add("user", input, "user_input");

		setControllerInput(input);
		setUserInput("");
		setIsLoading(true);
	};

	const handleControllerResponse = (response, intent) => {
		setMessages((prev) => [
			...prev,
			{
				role: "assistant",
				content: response,
				intent: intent,
			},
		]);

		setIsLoading(false);
		setControllerInput("");
	};

	return (
		<div className="container">
			<img src="/svgs/A_Logo.png" alt="Agent Atom Logo" className="logo" />
			<div className="responseBox">
				{messages.map((message, index) => (
					<div
						key={index}
						className={`flex ${
							message.role === "user" ? "justify-end" : "justify-start"
						}`}
					>
						<div>
							<div>
								<p>{message.content}</p>
							</div>
						</div>
					</div>
				))}
			</div>
			{isLoading && <TypingDots />}
			<form onSubmit={handleSubmit} className="form">
				<div className="search-container">
					<input
						type="text"
						className="input"
						placeholder="Ask Atom ..."
						value={userInput}
						onChange={(e) => setUserInput(e.target.value)}
						disabled={isLoading}
					/>
					<button type="submit" className="button" disabled={isLoading}>
						{isLoading ? "Thinking..." : "Send"}
					</button>
				</div>
			</form>
			<Controller
				message={controllerInput}
				onResponse={handleControllerResponse}
			    historyManager={historyManager}
			/>
		</div>
	);
}

function TypingDots() {
	return (
		<span className="dots">
			<span>.</span>
			<span>.</span>
			<span>.</span>
		</span>
	);
}
