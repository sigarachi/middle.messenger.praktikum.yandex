import { Fetch } from '../../lib';
import { Dictionary } from '../../blocks';
import { IUser } from '../../components/user-settings/user-settings.interfaces';
import { BASE_API_URL } from '../constants';

export class AuthService {
	static url = '/auth';

	static network = new Fetch(BASE_API_URL + this.url);

	static async signIn(args: Dictionary): Promise<{
		ok: boolean;
		response: IUser;
	}> {
		return await this.network.post(`/signin`, {
			method: 'POST',
			data: args,
		});
	}

	static async signUp(args: Dictionary): Promise<{
		ok: boolean;
		response: IUser;
	}> {
		return await this.network.post(`/signup`, {
			method: 'POST',
			data: args,
		});
	}

	static async logout() {
		await this.network.post(`/logout`, { method: 'POST' });
	}
}
