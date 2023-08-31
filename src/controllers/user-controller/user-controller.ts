import { UserService } from '../../services';
import { Dictionary } from '../../blocks';
import { Store } from '../../lib/store';
import { router } from '../../utils';

export class UserController {
	static async getUser() {
		const { response } = await UserService.getCurrentUserInfo();
		Store.setStateAndPersist({ user: response });
	}

	static async updateUserInfo(data: Dictionary) {
		try {
			await UserService.updateUserSettings(data);
			await this.getUser();
		} catch (e: unknown) {
			router.go('/fallback');
			console.error(e);
		}
	}

	static async updateUserAvatar(data: File) {
		try {
			const fd = new FormData();
			fd.append('avatar', data, `${data.name}`);
			await UserService.updateUserAvatar(fd);
			await this.getUser();
		} catch (e: unknown) {
			router.go('/fallback');
			console.error(e);
		}
	}

	static async updateUserPassword(data: Dictionary) {
		try {
			await UserService.updateUserPassword(data);
			await this.getUser();
		} catch (e: unknown) {
			router.go('/fallback');
			console.error(e);
		}
	}
}
