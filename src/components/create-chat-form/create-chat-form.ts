import { Input } from '../input';
import { Form } from '../form';
import { createFormTemplate } from './create-chat-form.tmplt';
import { Button } from '../button';
import { ChatController } from '../../controllers/chat-controller';
import { router } from '../../utils';

const titleChatInput = new Input(
	{
		type: 'text',
		name: 'title',
		value: '',
		errorText: 'Ошибка валидации названия чата',
	},
	{}
);

const createButton = new Button({
	text: 'Создать чат',
	type: 'submit',
});

const createChatFormContext = {
	titleInput: titleChatInput.transformToString(),
	createButton: createButton.transformToString(),
};

export const createChatForm = new Form(
	{
		content: createFormTemplate(createChatFormContext),
		dataId: 'create-chat-form',
		className: 'chat-settings-wrapper',
	},
	{
		submit: async (event: Event) => {
			event.preventDefault();
			const form = event.target as HTMLFormElement;
			const formData = new FormData(form);

			const data = {
				title: formData.get('title'),
			};

			await ChatController.createChat(data);
			router.go('/messenger');
		},
	}
);
