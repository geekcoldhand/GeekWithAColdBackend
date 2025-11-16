import Base from "./Base";

export default class FAQ extends Base {
	constructor(context) {
		super(context);
	}

	handleUserInput(input) {
		return {
			response: "Hello! How can I assist you today?",
		};
	}
}
