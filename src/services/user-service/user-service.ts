import { Fetch } from '../../lib';
import { Dictionary } from '../../blocks';
import { IUser } from '../../components/user-settings/user-settings.interfaces';

export class UserService {
	static url = 'https://ya-praktikum.tech/api/v2';

	static network = new Fetch();

	static getCurrentUserInfo(): Promise<{
		ok: boolean;
		response: IUser;
	}> {
		return this.network.get(`${this.url}/auth/user`, { method: 'GET' });
	}

	static updateUserSettings(args: Dictionary) {
		const data = this.network.put(`${this.url}/user/profile`, {
			method: 'POST',
			data: args,
		});

		return data;
	}

	static updateUserAvatar(args: FormData) {
		const data = this.network.put(`${this.url}/user/profile/avatar`, {
			method: 'PUT',
			data: args,
		});

		return data;
	}

	static updateUserPassword(args: Dictionary) {
		const data = this.network.put(`${this.url}/user/password`, {
			method: 'POST',
			data: args,
		});

		return data;
	}
}
