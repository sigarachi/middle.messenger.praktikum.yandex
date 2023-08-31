import './styles.css';
import { Input } from '../input';
import { Button } from '../button';
import { Form } from '../form';
import { chatFormTemplate } from './chat-form.tmplt';
import { Block, Dictionary } from '../../blocks';
import { selectedChatTemplate } from './selected-chat.tmplt';
import { validateField, validateForm } from '../../lib';
import { IChat } from '../../services/chat-service/chat-service.interfaces';
import { createChatWebSocket } from '../../utils/create-chat-socket';
import { Store } from '../../lib/store';
import { ChatController } from '../../controllers/chat-controller';
import { Message } from '../message';

const sendMessage = async (socket: WebSocket, text: string) => {
	const messageInput = document.querySelector(
		'.message-input'
	) as HTMLInputElement;

	const message = {
		content: text,
		type: 'message',
	};
	socket.send(JSON.stringify(message));
	messageInput.value = '';
	await ChatController.getChats();
};

const getOldMessages = (socket: WebSocket) => {
	socket.addEventListener('open', () => {
		socket.send(
			JSON.stringify({
				content: '0',
				type: 'get old',
			})
		);
	});
};

const handleMessages = (message: Dictionary | Dictionary[]) => {
	const messagesContainer = document.querySelector('.chat-messages-wrapper');
	//const chatContainer = document.querySelector('.current-chat__main');

	const addMessage = (elem: Dictionary) => {
		if (messagesContainer && elem.content) {
			const myMessage = elem.user_id == Store.getState('user').user?.id;
			const dateObject = new Date(elem.time);
			const options: Intl.DateTimeFormatOptions = {
				weekday: 'short',
				month: 'short',
				day: 'numeric',
				hour: '2-digit',
				minute: '2-digit',
			};
			const time = new Intl.DateTimeFormat('ru-RU', options).format(dateObject);
			const node = new Message({
				myMessage,
				time,
				id: elem.id,
				text: elem.content,
			});

			if (document.getElementById(elem.id) !== null) {
				return;
			}
			messagesContainer.appendChild(node.getContent());
		}
	};

	if (message instanceof Array) {
		// revert array of messages
		message.map((_, index, array) => {
			addMessage(array[array.length - 1 - index]);
		});
	} else {
		addMessage(message);
	}
};

const getTemplate = (context = {}): { chatForm: string; template: string } => {
	const socket = createChatWebSocket(
		{
			userId: Store.getState('user')?.user?.id | 0,
			chatId: Store.getState('currentChat')?.currentChat?.id | 0,
			token: Store.getState('token')?.token,
		},
		handleMessages
	);
	window.onbeforeunload = () => {
		socket.close();
	};

	getOldMessages(socket);

	const messageInput = new Input(
		{
			type: 'text',
			name: 'message',
			placeholder: 'Введите сообщение',
			errorText: 'Сообщение не может быть пустым',
			className: 'message-input',
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
				const formData = new FormData(form);

				const data = {
					message: formData.get('message'),
				};

				validateForm(form, { message: { notEmpty: true } });

				sendMessage(socket, data.message as string);
			},
		}
	).transformToString();

	return {
		chatForm: chatForm,
		template: selectedChatTemplate({ content: chatForm, ...context }),
	};
};

interface IChatProps {
	title?: string;
	chat?: IChat;
	chatSettingsButton?: string;
}

export class SelectedChat extends Block {
	constructor(context: IChatProps, events = {}) {
		const { template, chatForm } = getTemplate(context);
		super('div', {
			events,
			content: chatForm,
			template: template,
		});
	}
}
