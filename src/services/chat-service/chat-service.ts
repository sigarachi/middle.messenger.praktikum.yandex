import { Dictionary } from '../../blocks';
import { Fetch } from '../../lib';

export class ChatService {
	static url = 'https://ya-praktikum.tech/api/v2/chats';

	static network = new Fetch();
	static async getChatList(): Promise<{ ok: boolean; response: Dictionary }> {
		return this.network.get(`${this.url}`, { method: 'GET' });
	}

	static async createChat(
		args: Dictionary
	): Promise<{ ok: boolean; response: Dictionary }> {
		return this.network.post(`${this.url}`, { data: args, method: 'POST' });
	}

	static async addUserToChat(
		args: Dictionary
	): Promise<{ ok: boolean; response: Dictionary }> {
		return this.network.put(`${this.url}/users`, { data: args, method: 'PUT' });
	}

	static async removeUserFromChat(
		args: Dictionary
	): Promise<{ ok: boolean; response: Dictionary }> {
		return this.network.delete(`${this.url}/users`, {
			data: args,
			method: 'DELETE',
		});
	}

	static async getChatUsers(
		id: string
	): Promise<{ ok: boolean; response: Dictionary }> {
		return this.network.get(`${this.url}/${id}/users`, { method: 'GET' });
	}

	static async getChatToken(
		id: string
	): Promise<{ ok: boolean; response: Dictionary }> {
		return this.network.post(`${this.url}/token/${id}`, {
			method: 'POST',
			data: {},
		});
	}
}
