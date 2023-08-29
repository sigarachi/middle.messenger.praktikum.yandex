import './styles.css';
import { Input } from '../input';
import { Button } from '../button';
import { Form } from '../form';
import { chatFormTemplate } from './chat-form.tmplt';
import { Block } from '../../blocks';
import { selectedChatTemplate } from './selected-chat.tmplt';
import { validateField, validateForm } from '../../lib';
import { IChat } from '../../services/chat-service/chat-service.interfaces';

const messageInput = new Input(
	{
		type: 'text',
		name: 'message',
		placeholder: 'Введите сообщение',
		errorText: 'Сообщение не может быть пустым',
	},
	{
		blur: (event: Event) => {
			validateField({ notEmpty: true }, { event });
		},
	}
);
const sendMessageButton = new Button({ text: 'Отправить' });

const chatFormContext = {
	messageInput: messageInput.transformToString(),
	sendMessageButton: sendMessageButton.transformToString(),
};

const chatForm = new Form(
	{
		content: chatFormTemplate(chatFormContext),
		className: 'chat-input-wrapper',
		dataId: 'chat-form',
	},
	{
		submit: (event: Event) => {
			const form = event.target as HTMLFormElement;
			//const formData = new FormData(form);

			validateForm(form, { message: { notEmpty: true } });
		},
	}
).transformToString();

interface IChatProps {
	title?: string;
	chat?: IChat;
	chatSettingsButton?: string;
}

export class SelectedChat extends Block {
	constructor(context: IChatProps, events = {}) {
		super('div', {
			events,
			content: chatForm,
			template: selectedChatTemplate({ content: chatForm, ...context }),
		});
	}
}
