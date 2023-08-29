import { ChatService } from '../../services/chat-service';
import { Store } from '../../lib/store';
import { Dictionary } from '../../blocks';
import { router } from '../../utils';

export class ChatController {
	static async getChats() {
		const { response } = await ChatService.getChatList();
		Store.setStateAndPersist({ chatList: response });
	}

	static async createChat(args: Dictionary) {
		try {
			await ChatService.createChat(args);
			await this.getChats();
		} catch (e) {
			router.go('/fallback');
		}
	}

	static async addUserToChat(args: Dictionary) {
		try {
			await ChatService.addUserToChat(args);
			await this.getChats();
		} catch (e) {
			router.go('/fallback');
		}
	}

	static async removeUserFromChat(args: Dictionary) {
		try {
			await ChatService.removeUserFromChat(args);
			await this.getChats();
		} catch (e) {
			router.go('/fallback');
		}
	}

	static async getChatUsers(id: string) {
		try {
			const { response } = await ChatService.getChatUsers(id);
			Store.setStateAndPersist({ currentChatUsers: response });
		} catch (e) {
			Store.setStateAndPersist({ currentChat: {} });
			Store.setStateAndPersist({ currentChatUsers: [] });
		}
	}
}
