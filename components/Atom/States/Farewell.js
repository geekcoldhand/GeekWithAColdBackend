import Base from "./Base";

export default class Farewell extends Base {
	constructor(context) {
		super(context);
		this.saveHistory = context;
	}

	async handleSendMessage() {
			if (!context) {
			alert("Uh Oh.. No context to send");
			return;
		}

		try {
			// Call the backend API to send the email
			const response = await fetch("/api/booking-email", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					context: this.context,
				}),
			});

			if (response.ok) {
				alert(
					"Thank You! We will get back to you soon to confirm your booking."
				);
			} else {
				if (response.status === 500) {
					
				}
				alert("Failed to send message. Please try again.");
			}
		} catch (error) {
			console.error("Error sending message in Farewell:", error);
			alert("An error occurred in Farewell. Please try again.");
		}
	}

	handleUserInput(input) {
		return {
			response: "Bye now!",
		};
	}
}
