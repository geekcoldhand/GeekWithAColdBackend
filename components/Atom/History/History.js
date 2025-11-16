export default class HistoryManager {
	constructor() {
		this.history = [];
	}

	add(role, content, intent) {
		this.history.push({
			role,
			content,
			intent,
			timestamp: new Date().toISOString(),
		});
	}

	getHistory() {
		return this.history;
	}

	saveToStorage() {
		// TODO: In production: save to S3 or GitHub
		console.log("Saving conversation history:", this.history);
		// Simulate save
		//localStorage.setItem('chat_history', JSON.stringify(this.history));
		return true;
	}

	clear() {
		this.history = [];
	}
}
