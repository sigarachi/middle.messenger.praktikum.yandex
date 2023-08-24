import { Fetch } from '../../lib';
import { Dictionary } from '../../blocks';
import { IUser } from '../../components/user-settings/user-settings.interfaces';

export class AuthService {
	static url = 'https://ya-praktikum.tech/api/v2/auth';

	static network = new Fetch();

	static async signIn(args: Dictionary): Promise<{
		ok: boolean;
		response: IUser;
	}> {
		return await this.network.post(`${this.url}/signin`, {
			method: 'POST',
			data: args,
		});
	}

	static async signUp(args: Dictionary): Promise<{
		ok: boolean;
		response: IUser;
	}> {
		return await this.network.post(`${this.url}/signup`, {
			method: 'POST',
			data: args,
		});
	}

	static async logout() {
		await this.network.post(`${this.url}/logout`, { method: 'POST' });
	}
}
