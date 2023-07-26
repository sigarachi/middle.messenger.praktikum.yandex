import './styles.css';
import '../selected-chat/styles.css';
import Handlebars from 'handlebars';
import { Input } from '../input';
import { Button } from '../button';
import { Form } from '../form';
import { settingsTemplate } from './settings.tmplt';
import { passwordTemplate } from './password.tmplt';
import { validate, validateField } from '../../lib';
import {
	passwordSettingsSchema,
	userSettingsSchema,
} from './user-settings.schema';
import { Block } from '../../blocks';
import { IUserSettings } from './user-settings.interfaces';
import { userSettingsTemplate } from './user-settings.tmplt';

const avatarInput = new Input({
	type: 'file',
	name: 'avatar',
});
const loginInput = new Input(
	{
		type: 'text',
		name: 'login',
		value: 'Тестовый',
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
const secondNameInput = new Input(
	{
		type: 'text',
		name: 'second_name',
		value: 'Тестовый',
	},
	{
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		//@ts-ignore
		blur: (event) => {
			if (!validateField(event.target.value, userSettingsSchema.second_name))
				console.error('Second Name validation error');
		},
	}
);
const nameInput = new Input(
	{
		type: 'text',
		name: 'first_name',
		value: 'Тестовый',
	},
	{
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		//@ts-ignore
		blur: (event) => {
			if (!validateField(event.target.value, userSettingsSchema.first_name))
				console.error('First name validation error');
		},
	}
);
const phoneInput = new Input(
	{
		type: 'text',
		name: 'phone',
		value: 'Тестовый',
	},
	{
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		//@ts-ignore
		blur: (event) => {
			if (!validateField(event.target.value, userSettingsSchema.phone))
				console.error('Phone validation error');
		},
	}
);
const emailInput = new Input(
	{
		type: 'text',
		name: 'email',
		value: 'Тестовый',
	},
	{
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		//@ts-ignore
		blur: (event) => {
			if (!validateField(event.target.value, userSettingsSchema.email))
				console.error('Email validation error');
		},
	}
);
const displayNameInput = new Input(
	{
		type: 'text',
		name: 'display_name',
		value: 'Тестовый',
	},
	{
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		//@ts-ignore
		blur: (event) => {
			validateField(event.target.value, {});
		},
	}
);

const oldPasswordInput = new Input({
	type: 'password',
	name: 'oldPassword',
	placeholder: 'Старый пароль',
});
const newPassword = new Input(
	{
		type: 'password',
		name: 'newPassword',
		placeholder: 'Новый пароль',
	},
	{
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		//@ts-ignore
		blur: (event) => {
			if (!validateField(event.target.value, passwordSettingsSchema.password))
				console.error('Validation error');
		},
	}
);
const newPasswordAgain = new Input(
	{
		type: 'password',
		name: 'newPasswordAgain',
		placeholder: 'Новый пароль еще раз',
	},
	{
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		//@ts-ignore
		blur: (event) => {
			if (!validateField(event.target.value, passwordSettingsSchema.password))
				console.error('Validation error');
		},
	}
);

const saveInfoButton = new Button({ text: 'Сохранить', type: 'submit' });
const savePasswordButton = new Button({
	text: 'Сохранить пароль',
});

const userSettingsContext = {
	loginInput: loginInput.transformToString(),
	avatarInput: avatarInput.transformToString(),
	secondNameInput: secondNameInput.transformToString(),
	nameInput: nameInput.transformToString(),
	phoneInput: phoneInput.transformToString(),
	emailInput: emailInput.transformToString(),
	displayNameInput: displayNameInput.transformToString(),
	saveInfoButton: saveInfoButton.transformToString(),
};

const settingsForm = new Form(
	{
		children: {
			inputs: [
				loginInput,
				avatarInput,
				secondNameInput,
				nameInput,
				phoneInput,
				emailInput,
				displayNameInput,
			],
			button: [saveInfoButton],
		},
		content: settingsTemplate(userSettingsContext),
		dataId: 'settings-form',
	},
	{
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		//@ts-ignore
		submit: (event) => {
			const formData = new FormData(event.target);

			const data = {
				avatar: formData.get('avatar'),
				first_name: formData.get('first_name'),
				second_name: formData.get('second_name'),
				login: formData.get('login'),
				phone: formData.get('phone'),
				email: formData.get('email'),
				display_name: formData.get('display_name'),
			};

			if (!validate(userSettingsSchema, data))
				console.error('User settings validation error');

			console.log(Object.values(data));
		},
	}
);

const passwordContext = {
	oldPasswordInput: oldPasswordInput.transformToString(),
	newPassword: newPassword.transformToString(),
	newPasswordAgain: newPasswordAgain.transformToString(),
	savePasswordButton: savePasswordButton.transformToString(),
};

const passwordSettings = new Form(
	{
		content: passwordTemplate(passwordContext),
		className: 'user-info-wrapper',
		children: {
			inputs: [oldPasswordInput, newPassword, newPasswordAgain],
			button: [savePasswordButton],
		},
		dataId: 'password-settings',
	},
	{
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		//@ts-ignore
		submit: (event) => {
			const formData = new FormData(event.target);

			const data = {
				oldPassword: formData.get('oldPassword'),
				newPassword: formData.get('newPassword'),
				newPasswordAgain: formData.get('newPasswordAgain'),
			};

			if (
				!validate(
					{
						newPassword: { ...passwordSettingsSchema.password },
						newPasswordAgain: {
							// eslint-disable-next-line @typescript-eslint/ban-ts-comment
							//@ts-ignore
							matches: data.newPassword.toString(),
						},
					},
					data
				)
			)
				console.error('Password form validation error');

			console.log(Object.values(data));
		},
	}
);

const pageContext = {
	settingsForm: settingsForm.transformToString(),
	passwordSettings: passwordSettings.transformToString(),
};

const userSettingsPage = Handlebars.compile(userSettingsTemplate);

export class UserSettings extends Block {
	constructor(context: IUserSettings, events = {}) {
		super('div', {
			...context,
			events,
			template: userSettingsPage({ ...pageContext, ...context }),
		});
	}
}
