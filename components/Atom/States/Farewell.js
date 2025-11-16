import Base from "./Base";

export default class Farewell extends Base {
	constructor(context) {
		super(context);
	}

	handleUserInput(input) {
		return {
			response: "Bye now!",
		};
	}
}
