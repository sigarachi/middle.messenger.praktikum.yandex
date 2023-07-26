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
import { validate, validateField } from '../../lib';

const loginInput = new Input(
	{
		type: 'text',
		name: 'login',
		placeholder: 'Логин',
	},
	{
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		//@ts-ignore
		blur: (event) => {
			if (!validateField(event.target.value, userSettingsSchema.login))
				console.error('Login validation error');
		},
	}
);
const passwordInput = new Input(
	{
		type: 'password',
		name: 'password',
		placeholder: 'Пароль',
	},
	{
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		//@ts-ignore
		blur: (event) => {
			if (!validateField(event.target.value, passwordSettingsSchema.password))
				console.error('Password validation error');
		},
	}
);
const authButton = new Button({ text: 'Авторизация' });
const registerLink = new Link({
	text: 'Нет аккаунта?',
	url: '/register',
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
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		//@ts-ignore
		submit: (event) => {
			const formData = new FormData(event.target);

			const data = {
				login: formData.get('login'),
				password: formData.get('password'),
			};

			if (
				!validate(
					{
						login: userSettingsSchema.login,
						password: passwordSettingsSchema.password,
					},
					data
				)
			)
				console.error('Form validation Error');

			console.log(Object.values(formData));
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
}

export const authPage = Handlebars.compile(template);
