import { Fetch } from '../../lib';

export class ResourcesService {
	static url = 'https://ya-praktikum.tech/api/v2/resources';

	static network = new Fetch();

	static async getImage(path: string) {
		return this.network.get(`${this.url}/${path}`, { method: 'GET' });
	}
}
