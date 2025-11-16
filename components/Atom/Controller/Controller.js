import React from "react";
import Greeting from "../States/Greeting";
import FAQ from "../States/Faq";
import Unknown from "../States/Unknown";
import Farewell from "../States/Farewell";

export default class Controller extends React.Component {
	constructor(props) {
		super(props);
		this.state = { isProcessing: false };

		// Bind methods
		this.processMessage = this.processMessage.bind(this);
		this.detectIntent = this.detectIntent.bind(this);
		this.transitionState = this.transitionState.bind(this);
		this.callAGI = this.callAGI.bind(this);
		this.saveHistory = this.saveHistory.bind(this);

		// Initialize state classes
		this.states = {
			greeting: new Greeting(),
			faq: new FAQ(),
			unknown: new Unknown(this.callAGI),
			farewell: new Farewell(this.saveHistory),
		};
	}

	async callAGI(input) {
		try {
			const response = await fetch(
				"https://horatiousaharris-atom-fsm-chat-bot.hf.space/api/chat",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						message: input,
						system_message: "You are a helpful assistant named Atom.",
						max_tokens: 128,
						temperature: 0.7,
						top_p: 0.95,
						history: this.props.historyManager.getHistory(),
					}),
				}
			);

			if (!response.ok) {
				throw new Error(`API error: ${response.status}`);
			}

			const data = await response.json();
			return data.response; 
		} catch (error) {
			console.error("AGI API Error:", error);
			throw error; // Re-throw so UnknownState can handle it
		}
	}

	saveHistory() {
		this.props.historyManager.saveToStorage();
	}

	componentDidUpdate(prevProps) {
		if (this.props.message && this.props.message !== prevProps.message) {
			this.processMessage();
		}
	}

	async processMessage() {
		const { message, onResponse, historyManager } = this.props;

		const intent = this.detectIntent(message);
		const stateHandler = this.transitionState(intent);
		const result = await stateHandler.handleUserInput(message);
		historyManager.add("assistant", result.response, intent);
		
		onResponse(result.response, intent);
	}

	detectIntent(input) {
		const lowerInput = input.toLowerCase();

		const greetingKeywords = ["hi", "hello", "hey", "sup"];
		const faqKeywords = ["weather", "time", "help"];
		const farewellKeywords = ["bye", "goodbye", "farewell"];

		if (greetingKeywords.some((kw) => lowerInput.includes(kw))) {
			return "greeting";
		}
		if (farewellKeywords.some((kw) => lowerInput.includes(kw))) {
			return "farewell";
		}
		if (faqKeywords.some((kw) => lowerInput.includes(kw))) {
			return "faq";
		}

		return "unknown";
	}

	transitionState(intent) {
		switch (intent) {
			case "greeting":
				return this.states.greeting;
			case "faq":
				return this.states.faq;
			case "farewell":
				return this.states.farewell;
			case "unknown":
				return this.states.unknown;
			default:
				return this.states.unknown;
		}
	}

	render() {
		return null;
	}
}
