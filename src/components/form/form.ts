import { Block } from '../../blocks';
import { template } from './form.tmplt';
import { IFormProps } from './form.interfaces';

export class Form extends Block {
	constructor(context: IFormProps, events = {}) {
		super('div', {
			...context,
			events,
			template: template,
		});
	}
}
