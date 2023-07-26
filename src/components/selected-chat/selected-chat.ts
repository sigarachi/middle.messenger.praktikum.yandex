import './styles.css';
import { Input } from '../input';
import { Button } from '../button';
import { Form } from '../form';
import { chatFormTemplate } from './chat-form.tmplt';
import { Block } from '../../blocks';
import { selectedChatTemplate } from './selected-chat.tmplt';
import { validate, validateField } from '../../lib';

const messageInput = new Input(
	{
		type: 'text',
		name: 'message',
		placeholder: 'Введите сообщение',
	},
	{
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		//@ts-ignore
		blur: (event) => {
			if (!validateField(event.target.value, { notEmpty: true }))
				console.error('Message validation error');
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
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		//@ts-ignore
		submit: (event) => {
			const formData = new FormData(event.target);

			if (
				!validate(
					{ message: { notEmpty: true } },
					{ message: formData.get('message') }
				)
			) {
				console.error('Form validation error');
			}

			console.log(Object.values(formData));
		},
	}
).transformToString();

interface IChatProps {
	title?: string;
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
