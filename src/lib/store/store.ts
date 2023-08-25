import { Dictionary } from '../../blocks';

export class Store {
	//private state: Dictionary = {};
	private static state: Dictionary = {};

	public static getState(key: string) {
		if (!Object.hasOwn(this.state, key)) {
			const obj = {};
			const item: string | null = localStorage.getItem(key);
			if (item !== null && item !== 'undefined') {
				// eslint-disable-next-line @typescript-eslint/ban-ts-comment
				//@ts-ignore
				obj[key] = JSON.parse(item);
				Object.assign(this.state, obj);
			}
		}
		return this.state;
	}

	public static setState(newValue: any) {
		Object.assign(this.state, newValue);
	}

	public static setStateAndPersist(
		newValue: Dictionary,
		withoutStringify?: boolean
	) {
		Object.assign(this.state, newValue);
		const entries = Object.entries(newValue)[0];
		const key = entries[0];
		const value = withoutStringify ? entries[1] : JSON.stringify(entries[1]);
		localStorage.setItem(key.toString(), value);
	}
}
