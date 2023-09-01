import { Block } from '../../blocks';
import { userListItemTemplate } from './user-list-item.tmplt';
import './style.css';

export class UserListItem extends Block {
	constructor(context = {}, events = {}) {
		super('div', {
			...context,
			events,
			template: userListItemTemplate(context),
		});
	}
}
