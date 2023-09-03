import { Block } from '../../blocks';
import { template } from './button.tmplt';
import { IButton } from './button.interfaces';
import './style.scss';

const createClassName = (className: string = 'button-wrapper') => {
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
