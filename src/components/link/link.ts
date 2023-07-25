import './style.css';
import { template } from './link.tmplt';
import { Block } from '../../blocks';
import { ILinkProps } from './link.interfaces';

export class Link extends Block {
	constructor(context: ILinkProps, events = {}) {
		super('div', {
			...context,
			events,
			template: template,
		});
	}
}
