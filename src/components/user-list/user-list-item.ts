import { Block } from '../../blocks';
import { userListItemTemplate } from './user-list-item.tmplt';

export class UserListItem extends Block {
	constructor(context = {}, events = {}) {
		super('li', {
			...context,
			events,
			template: userListItemTemplate(context),
		});
	}
}
