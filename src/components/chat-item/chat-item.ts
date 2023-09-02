import { Block } from '../../blocks';
import { chatItemTemplate } from './chat-item.tmplt';

export class ChatElement extends Block {
	constructor(context = {}, events = {}) {
		super('div', {
			...context,
			events,
			template: chatItemTemplate(context),
		});
	}
}
