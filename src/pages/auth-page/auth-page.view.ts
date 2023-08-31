import Handlebars from 'handlebars';
import {
	Button,
	Input,
	Link,
	passwordSettingsSchema,
	userSettingsSchema,
} from '../../components';
import './styles.css';
import '../../utils/utils.css';
import { Form } from '../../components/form';
import { authPageTemplate, template } from './auth-page.tmplt';
import { authFormTemplate } from './auth-form.tmplt';
import { Block } from '../../blocks';
import { validateField, validateForm } from '../../lib';
import { AuthService } from '../../services';
import { UserController } from '../../controllers';
import { ChatController } from '../../controllers/chat-controller';
import { router } from '../../utils';

const loginInput = new Input(
	{
		type: 'text',
		name: 'login',
		placeholder: 'Логин',
		errorText: 'Ошибка валидации логина',
	},
	{
		blur: (event: Event) => {
			validateField(userSettingsSchema.login, { event });
		},
	}
);
const passwordInput = new Input(
	{
		type: 'password',
		name: 'password',
		placeholder: 'Пароль',
		errorText: 'Ошибка валидации пароля',
	},
	{
		blur: (event: Event) => {
			validateField(passwordSettingsSchema.password, { event });
		},
	}
);
const authButton = new Button({ text: 'Авторизация' });
const registerLink = new Link({
	text: 'Нет аккаунта?',
	url: '/sign-up',
});

const authFormContext = {
	loginInput: loginInput.transformToString(),
	passwordInput: passwordInput.transformToString(),
	authButton: authButton.transformToString(),
	registerLink: registerLink.transformToString(),
};

const authForm = new Form(
	{
		dataId: 'auth-form',
		content: authFormTemplate(authFormContext),
		className: 'form-wrapper',
	},
	{
		submit: (event: Event) => {
			const form = event.target as HTMLFormElement;
			const formData = new FormData(form);

			const schema = {
				login: userSettingsSchema.login,
				password: passwordSettingsSchema.password,
			};

			const data = {
				login: formData.get('login'),
				password: formData.get('password'),
			};

			validateForm(form, schema);

			AuthService.signIn(data)
				.then(async () => {
					await UserController.getUser();
					router.go('/messenger');
				})
				.catch((error) => {
					if (error.error.reason === 'User already in system')
						router.go('/messenger');
				});
		},
	}
).transformToString();

export class AuthPage extends Block {
	constructor(context = {}, events = {}) {
		super('div', {
			...context,
			events,
			template: authPageTemplate({ content: authForm }),
		});
	}

	componentDidMount() {
		UserController.getUser();
		ChatController.getChats();
	}
}

export const authPage = Handlebars.compile(template);
