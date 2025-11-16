import Base from "./Base.js";

export default class Greeting extends Base {
	constructor() {
		super();
		this.greetingPhrases = [
			"Hello! How can I help you today?",
			"Hi there! What can I do for you?",
			"Hey! I'm here to assist you.",
			"Greetings! What would you like to know?",
			"Welcome! How may I help you?",
		];
	}

	handleUserInput(input) {
		// Return random greeting
		const randomIndex = Math.floor(Math.random() * this.greetingPhrases.length);
		return {
			response: this.greetingPhrases[randomIndex],
		};
	}
}
