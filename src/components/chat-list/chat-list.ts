import './styles.css';
import { Block, Dictionary } from '../../blocks';
import { chatListTemplate } from './chat-list.tmplt';
import { IChat } from '../../services/chat-service/chat-service.interfaces';
import { ChatElement } from '../chat-item';
import { Store } from '../../lib/store';
import { router } from '../../utils';
import { ChatController } from '../../controllers/chat-controller';

const getTemplate = (): string => {
	const listData = Store.getState('chatList').chatList as
		| Array<Dictionary>
		| [];

	const data = listData.map((item) =>
		new ChatElement(
			{
				...item,
				dataId: item.id.toString(),
			},
			{
				click: async () => {
					Store.setStateAndPersist({ currentChat: item });
					await ChatController.getChatUsers(item.id);
					if (window.location.href !== '/messenger') {
						router.go('/messenger');
					} else {
						window.location.reload();
					}
				},
			}
		).transformToString()
	);

	return chatListTemplate({ listData: data });
};

export class ChatList extends Block {
	constructor(context: { listData: Array<IChat> }, events = {}) {
		super('div', {
			events,
			context: { ...context },
			template: getTemplate(),
		});
	}
}
