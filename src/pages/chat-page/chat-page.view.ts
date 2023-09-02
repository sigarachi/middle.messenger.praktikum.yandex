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
import { ChatController } from '../../controllers/chat-controller';
import { ChatSettings } from '../../components/chat-settings';
import { EmptyChat } from '../../components/empty-chat';

const getTemplate = (context = {}): string => {
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

	const emptyChat = new EmptyChat();

	const chatPageContext = {
		chat,
		settings,
		createChatForm: createChatForm.transformToString(),
		chatSettings: chatSettings.transformToString(),
		emptyChat: emptyChat.transformToString(),
		searchWrapper,
		list,
	};

	return chatPageTemplate({
		...chatPageContext,
		...context,
		showEmptyChat: !Store.getState('currentChat').currentChat,
	});
};

interface ChatPageProps {
	settingsOpen?: boolean;
	createFormOpen?: boolean;
	chatSettingsOpen?: boolean;
	showEmptyChat?: boolean;
}

export class ChatPage extends Block {
	constructor(context: ChatPageProps, events = {}) {
		super('div', {
			...context,
			events,
			template: getTemplate(context),
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
