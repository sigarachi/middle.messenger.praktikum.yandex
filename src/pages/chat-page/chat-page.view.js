import './styles.css';
import {
	chatList,
	search,
	selectedChat,
	userSettings,
} from '../../components/index.js';
import Handlebars from 'handlebars';

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

const chat = selectedChat({});
const settings = userSettings({ title: 'Редактирование профиля' });
const searchWrapper = search({ user: 'Тестовый пользователь' });

const template = `
	<div class="full-size__wrapper">
		<div class="left-size__wrapper">
			${searchWrapper}
			${list}
		</div>
		<div class="right-size__wrapper">
		{{#if settingsOpen}}
			${settings}
		{{else}}
			${chat}
		{{/if}}
		</div>
	</div>
`;

export const chatPage = Handlebars.compile(template);
