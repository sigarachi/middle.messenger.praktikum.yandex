import { Dictionary } from '../../blocks';
import { Fetch } from '../../lib';
import { BASE_API_URL } from '../constants';

export class ChatService {
	static url = '/chats';

	static network = new Fetch(BASE_API_URL + this.url);
	static async getChatList(): Promise<{ ok: boolean; response: Dictionary }> {
		return this.network.get(``, { method: 'GET' });
	}

	static async createChat(
		args: Dictionary
	): Promise<{ ok: boolean; response: Dictionary }> {
		return this.network.post(``, { data: args, method: 'POST' });
	}

	static async addUserToChat(
		args: Dictionary
	): Promise<{ ok: boolean; response: Dictionary }> {
		return this.network.put(`/users`, { data: args, method: 'PUT' });
	}

	static async removeUserFromChat(
		args: Dictionary
	): Promise<{ ok: boolean; response: Dictionary }> {
		return this.network.delete(`/users`, {
			data: args,
			method: 'DELETE',
		});
	}

	static async getChatUsers(
		id: string
	): Promise<{ ok: boolean; response: Dictionary }> {
		return this.network.get(`/${id}/users`, { method: 'GET' });
	}

	static async getChatToken(
		id: string
	): Promise<{ ok: boolean; response: Dictionary }> {
		return this.network.post(`/token/${id}`, {
			method: 'POST',
			data: {},
		});
	}
}
