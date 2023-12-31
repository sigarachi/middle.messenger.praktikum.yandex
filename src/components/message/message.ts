import { Block } from '../../blocks';
import { messageTemplate } from './message.tmplt';
import './style.scss';

export class Message extends Block {
	constructor(context = {}, events = {}) {
		super('div', {
			...context,
			template: messageTemplate(context),
			events,
		});
	}
}
