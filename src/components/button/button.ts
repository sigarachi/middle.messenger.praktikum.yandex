import './style.css';
import { Block } from '../../blocks';
import { template } from './button.tmplt';
import { IButton } from './button.interfaces';

const createClassName = (className: string = '') => {
	return `button ${className}`;
};

export class Button extends Block {
	constructor(context: IButton, events = {}) {
		super('div', {
			...context,
			className: createClassName(context.className),
			events,
			template: template,
		});
	}
}
