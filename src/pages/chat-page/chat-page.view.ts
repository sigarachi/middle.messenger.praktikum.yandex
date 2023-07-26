import './styles.css';
import { chatList, Search, SelectedChat, UserSettings } from '../../components';
import { Block } from '../../blocks';
import { chatPageTemplate } from './chat-page.tmplt';

const list = chatList({
	listData: [
		{
			title: 'Антон',
			description: 'Я тут новую фичу нашел',
		},
		{
			title: 'Антон',
			description: 'Я тут новую фичу нашел',
		},
		{
			title: 'Антон',
			description: 'Я тут новую фичу нашел',
		},
	],
});

const chat = new SelectedChat({ title: 'Чат' }).transformToString();
const settings = new UserSettings(
	{ title: 'Редактирование профиля' },
	{}
).transformToString();
const searchWrapper = new Search({
	user: 'Тестовый пользователь',
}).transformToString();

const chatPageContext = {
	chat,
	settings,
	searchWrapper,
	list,
};

interface ChatPageProps {
	settingsOpen?: boolean;
}

export class ChatPage extends Block {
	constructor(context: ChatPageProps, events = {}) {
		super('div', {
			...context,
			events,
			template: chatPageTemplate({ ...chatPageContext, ...context }),
		});
	}
}
