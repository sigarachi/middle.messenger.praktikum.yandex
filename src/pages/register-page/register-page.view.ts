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
import { registerFormTemplate } from './register-form.tmplt';
import { Block } from '../../blocks';
import { registerPageTemplate } from './register-page.tmplt';
import { validate, validateField } from '../../lib';

const loginInput = new Input(
	{
		type: 'text',
		name: 'login',
		placeholder: 'Логин',
	},
	{
		blur: (event) => {
			if (validateField(event.target.value, userSettingsSchema.login))
				console.error('Login validation error');
		},
	}
);
const firstNameInput = new Input(
	{
		type: 'text',
		name: 'first_name',
		placeholder: 'Имя',
	},
	{
		blur: (event) => {
			if (validateField(event.target.value, userSettingsSchema.first_name))
				console.error('First name validation error');
		},
	}
);
const secondNameInput = new Input(
	{
		type: 'text',
		name: 'second_name',
		placeholder: 'Фамилия',
	},
	{
		blur: (event) => {
			if (validateField(event.target.value, userSettingsSchema.second_name))
				console.error('Second name validation error');
		},
	}
);
const passwordInput = new Input(
	{
		type: 'password',
		name: 'password',
		placeholder: 'Логин',
	},
	{
		blur: (event) => {
			if (validateField(event.target.value, passwordSettingsSchema.password))
				console.error('Password validation error');
		},
	}
);
const emailInput = new Input(
	{
		type: 'text',
		name: 'email',
		placeholder: 'Email',
	},
	{
		blur: (event) => {
			if (validateField(event.target.value, userSettingsSchema.email))
				console.error('Email validation error');
		},
	}
);
const phoneInput = new Input(
	{
		type: 'text',
		name: 'phone',
		placeholder: 'Телефон',
	},
	{
		blur: (event) => {
			if (validateField(event.target.value, userSettingsSchema.phone))
				console.error('Phone validation error');
		},
	}
);
const authButton = new Button({
	text: 'Зарегистрироваться',
	type: 'submit',
});
const authLink = new Link({
	text: 'Уже есть аккаунт?',
	url: '/auth',
});

const registerFormContext = {
	loginInput: loginInput.transformToString(),
	firstNameInput: firstNameInput.transformToString(),
	secondNameInput: secondNameInput.transformToString(),
	passwordInput: passwordInput.transformToString(),
	emailInput: emailInput.transformToString(),
	phoneInput: phoneInput.transformToString(),
	authButton: authButton.transformToString(),
	authLink: authLink.transformToString(),
};

const registerForm = new Form(
	{
		content: registerFormTemplate(registerFormContext),
		className: 'form-wrapper',
	},
	{
		submit: (event) => {
			const formData = new FormData(event.target);

			const data = {
				first_name: formData.get('first_name'),
				second_name: formData.get('second_name'),
				login: formData.get('login'),
				phone: formData.get('phone'),
				email: formData.get('email'),
				password: formData.get('password'),
			};

			if (!validate({ ...userSettingsSchema, ...passwordSettingsSchema }, data))
				console.error('User settings validation error');

			console.log(Object.values(data));
		},
	}
).transformToString();

export class RegisterPage extends Block {
	constructor(events = {}) {
		super('div', {
			events,
			template: registerPageTemplate({ content: registerForm }),
		});
	}
}
