import { styledBlock } from './components';
import { Block } from '../../blocks';
import { Button } from '../../components';
import { router } from '../../utils';

const goToChatButton = new Button(
	{
		text: 'Перейти к чатам',
		dataId: 'goToChats',
	},
	{
		click: () => {
			router.go('/messenger');
		},
	}
);

export class FallbackPage extends Block {
	constructor() {
		super('div', {
			template: styledBlock({
				header: '500',
				description: 'Ошибка',
				link: goToChatButton.transformToString(),
			}),
			context: {},
			events: {},
		});
	}
}
