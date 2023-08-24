import './styles.css';
import { Block } from '../../blocks';
import { chatListTemplate } from './chat-list.tmplt';
import { IChat } from '../../services/chat-service/chat-service.interfaces';
import { ChatElement } from '../chat-item';
import { Store } from '../../lib/store';

export class ChatList extends Block {
	constructor(context: { listData: Array<IChat> }, events = {}) {
		const data = context.listData.map((item) =>
			new ChatElement(
				{
					...item,
					dataId: item.id.toString(),
				},
				{
					click: () => {
						Store.setStateAndPersist({ currentChat: item });
						if (window.location.href !== '/messenger') {
							window.location.href = '/messenger';
						} else {
							window.location.reload();
						}
					},
				}
			).transformToString()
		);
		super('div', {
			events,
			context: { ...context, listData: data },
			template: chatListTemplate({ listData: data }),
		});
	}
}
