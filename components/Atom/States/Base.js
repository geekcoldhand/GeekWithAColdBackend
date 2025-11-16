export default class Base {
	constructor(context) {
		this.context = context; // optional shared info
	}
	handle(input) {
		throw new Error("handle() must be implemented");
	}
}
