import './style.css';
import { template } from './input.tmplt';
import { Block } from '../../blocks';
import { IInputProps } from './input.interfaces';

export class Input extends Block {
	constructor(context: IInputProps, events = {}) {
		super('div', {
			...context,
			events,
			dataId: context.name,
			template: template,
		});
	}
}
