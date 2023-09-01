import { Fetch } from '../../lib';
import { BASE_API_URL } from '../constants';

export class ResourcesService {
	static url = '/resources';

	static network = new Fetch(BASE_API_URL + this.url);

	static async getImage(path: string) {
		return this.network.get(`/${path}`, { method: 'GET' });
	}
}
