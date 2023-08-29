import { Block } from '../../blocks';
import { styledBlock } from '../../pages';

export class EmptyChat extends Block {
	constructor() {
		super('div', {
			context: {},
			template: styledBlock({
				header: 'Не выбран чат',
				description: 'Кликните на чат, чтобы перейти к перепискам',
			}),
			events: {},
		});
	}
}
