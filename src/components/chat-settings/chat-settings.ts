import { Form } from '../form';
import { Button } from '../button';
import { ChatController } from '../../controllers/chat-controller';
import { chatSettingsTemplate } from './chat-settings.tmplt';
import { UserList } from '../user-list';
import { Store } from '../../lib/store';
import { Input } from '../input';
import { addUserFormTemplate } from './add-user-form.tmplt';
import { Block } from '../../blocks';

const userList = new UserList(
	{ userList: Store.getState('currentChatUsers').currentChatUsers || [] },
	{}
).transformToString();

const addUserInput = new Input(
	{
		type: 'text',
		name: 'user',
		value: '',
		errorText: 'Ошибка валидации названия чата',
	},
	{}
);

const createButton = new Button({
	text: 'Добавить пользователя',
	type: 'submit',
});

const addUserFormContext = {
	addUserInput: addUserInput.transformToString(),
	createButton: createButton.transformToString(),
};

const addUserForm = new Form(
	{
		content: addUserFormTemplate(addUserFormContext),
		dataId: 'add-user',
		className: 'chat-settings-wrapper',
	},
	{
		submit: async (event: Event) => {
			event.preventDefault();
			const form = event.target as HTMLFormElement;
			const formData = new FormData(form);

			const data = {
				users: [formData.get('user')],
				chatId: Store.getState('currentChat').currentChat.id,
			};

			await ChatController.addUserToChat(data);
			window.location.reload();
		},
	}
).transformToString();

export class ChatSettings extends Block {
	constructor(events = {}) {
		super('div', {
			context: {},
			events,
			template: chatSettingsTemplate({ userList, addUserForm }),
		});
	}
}
