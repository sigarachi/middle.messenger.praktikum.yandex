import { Fetch } from '../../lib';
import { Dictionary } from '../../blocks';
import { IUser } from '../../components/user-settings/user-settings.interfaces';
import { BASE_API_URL } from '../constants';

export class UserService {
	static url = '/';

	static network = new Fetch(BASE_API_URL + this.url);

	static getCurrentUserInfo(): Promise<{
		ok: boolean;
		response: IUser;
	}> {
		return this.network.get(`/auth/user`, { method: 'GET' });
	}

	static updateUserSettings(args: Dictionary) {
		const data = this.network.put(`/user/profile`, {
			method: 'POST',
			data: args,
		});

		return data;
	}

	static updateUserAvatar(args: FormData) {
		const data = this.network.put(`/user/profile/avatar`, {
			method: 'PUT',
			data: args,
		});

		return data;
	}

	static updateUserPassword(args: Dictionary) {
		const data = this.network.put(`/user/password`, {
			method: 'POST',
			data: args,
		});

		return data;
	}
}
