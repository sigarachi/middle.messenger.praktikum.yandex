import { UserService } from '../../services/user-service/user-service';
import { Dictionary } from '../../blocks';
import { Store } from '../../lib/store';

export class UserController {
	static async getUser() {
		try {
			const { response } = await UserService.getCurrentUserInfo();
			Store.setStateAndPersist({ user: response });
		} catch (e) {
			//window.location.href = '/fallback';
			console.error(e);
		}
	}

	static async updateUserInfo(data: Dictionary) {
		try {
			await UserService.updateUserSettings(data);
			await this.getUser();
		} catch (e) {
			window.location.href = '/fallback';
			console.error(e);
		}
	}

	static async updateUserAvatar(data: Dictionary) {
		try {
			await UserService.updateUserAvatar(data);
			await this.getUser();
		} catch (e) {
			window.location.href = '/fallback';
			console.error(e);
		}
	}

	static async updateUserPassword(data: Dictionary) {
		try {
			await UserService.updateUserPassword(data);
			await this.getUser();
		} catch (e) {
			window.location.href = '/fallback';
			console.error(e);
		}
	}
}
