// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck

export interface Listeners {
	[key: string]: Array<() => void>;
}

export class EventBus {
	listeners: Listeners;
	constructor() {
		this.listeners = {};
	}

	on(event, callback) {
		if (!this.listeners[event]) {
			this.listeners[event] = [];
		}

		this.listeners[event].push(callback);
	}

	off(event, callback) {
		if (!this.listeners[event]) {
			throw new Error(`Нет события: ${event}`);
		}

		this.listeners[event] = this.listeners[event].filter(
			(listener) => listener !== callback
		);
	}

	emit(event, ...args) {
		if (!this.listeners[event]) {
			throw new Error(`Нет события: ${event}`);
		}

		this.listeners[event].forEach(function (listener) {
			listener(...args);
		});
	}
}
