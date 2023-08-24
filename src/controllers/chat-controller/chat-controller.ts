import { ChatService } from '../../services/chat-service/chat-service';
import { Store } from '../../lib/store';
import { Dictionary } from '../../blocks';

export class ChatController {
	static async getChats() {
		try {
			const { response } = await ChatService.getChatList();
			Store.setStateAndPersist({ chatList: response });
		} catch (e) {
			window.location.href = '/fallback';
			console.error(e);
		}
	}

	static async createChat(args: Dictionary) {
		try {
			await ChatService.createChat(args);
			await this.getChats();
		} catch (e) {
			window.location.href = '/fallback';
			console.error(e);
		}
	}

	static async addUserToChat(args: Dictionary) {
		try {
			await ChatService.addUserToChat(args);
			await this.getChats();
		} catch (e) {
			window.location.href = '/fallback';
			console.error(e);
		}
	}

	static async removeUserFromChat(args: Dictionary) {
		try {
			await ChatService.removeUserFromChat(args);
			await this.getChats();
		} catch (e) {
			window.location.href = '/fallback';
			console.error(e);
		}
	}

	static async getChatUsers(id: string) {
		try {
			const { response } = await ChatService.getChatUsers(id);
			Store.setStateAndPersist({ currentChatUsers: response });
		} catch (e) {
			window.location.href = '/fallback';
			console.error(e);
		}
	}
}
