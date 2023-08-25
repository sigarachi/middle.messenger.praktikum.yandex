import './styles.css';
import {
	Button,
	ChatList,
	Search,
	SelectedChat,
	UserSettings,
} from '../../components';
import { Block } from '../../blocks';
import { chatPageTemplate } from './chat-page.tmplt';
import { Store } from '../../lib/store';
import { createChatForm } from '../../components/create-chat-form';
import { ChatController } from '../../controllers/chat-controller/chat-controller';
import { ChatSettings } from '../../components/chat-settings/chat-settings';

const list = new ChatList({
	listData: Store.getState('chatList')?.chatList || [],
}).transformToString();

const chatSettingsButton = new Button(
	{
		text: 'Настройки',
		dataId: 'chat-settings-relocate',
	},
	{
		click: () => (window.location.href = '/chat-settings'),
	}
).transformToString();

const chat = new SelectedChat({
	title: Store.getState('currentChat')?.currentChat?.title || '',
	chat: Store.getState('currentChat')?.currentChat,
	chatSettingsButton,
}).transformToString();
const settings = new UserSettings(
	{ title: 'Редактирование профиля' },
	{}
).transformToString();
const searchWrapper = new Search({
	user: Store.getState('user')?.user?.display_name || '',
}).transformToString();

const chatSettings = new ChatSettings({});

const chatPageContext = {
	chat,
	settings,
	createChatForm: createChatForm.transformToString(),
	chatSettings: chatSettings.transformToString(),
	searchWrapper,
	list,
};

interface ChatPageProps {
	settingsOpen?: boolean;
	createFormOpen?: boolean;
	chatSettingsOpen?: boolean;
}

export class ChatPage extends Block {
	constructor(context: ChatPageProps, events = {}) {
		super('div', {
			...context,
			events,
			template: chatPageTemplate({ ...chatPageContext, ...context }),
		});
	}

	componentDidMount() {
		if (Store.getState('currentChat').currentChat) {
			ChatController.getChatUsers(
				Store.getState('currentChat')?.currentChat?.id
			);
		}
	}
}
