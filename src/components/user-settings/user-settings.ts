import './styles.scss';
import '../selected-chat/styles.scss';
import Handlebars from 'handlebars';
import { Input } from '../input';
import { Button } from '../button';
import { Form } from '../form';
import { settingsTemplate } from './settings.tmplt';
import { passwordTemplate } from './password.tmplt';
import { validateField, validateForm } from '../../lib';
import {
	passwordSettingsSchema,
	userSettingsSchema,
} from './user-settings.schema';
import { Block } from '../../blocks';
import { IUserSettings } from './user-settings.interfaces';
import { userSettingsTemplate } from './user-settings.tmplt';
import { UserController } from '../../controllers';
import { Store } from '../../lib/store';

const { user } = Store.getState('user');

const avatarInput = new Input({
	type: 'file',
	name: 'avatar',
});
const loginInput = new Input(
	{
		type: 'text',
		name: 'login',
		value: user?.login || '',
		errorText: 'Ошибка валидации логина',
	},
	{
		blur: (event: Event) => {
			validateField(userSettingsSchema.login, { event });
		},
	}
);
const secondNameInput = new Input(
	{
		type: 'text',
		name: 'second_name',
		value: user?.second_name || '',
		errorText: 'Ошибка валидации фамилии',
	},
	{
		blur: (event: Event) => {
			validateField(userSettingsSchema.second_name, { event });
		},
	}
);
const nameInput = new Input(
	{
		type: 'text',
		name: 'first_name',
		value: user?.first_name || '',
		errorText: 'Ошибка валидации имени',
	},
	{
		blur: (event: Event) => {
			validateField(userSettingsSchema.first_name, { event });
		},
	}
);
const phoneInput = new Input(
	{
		type: 'text',
		name: 'phone',
		value: user?.phone || '',
		errorText: 'Ошибка валидации телефона',
	},
	{
		blur: (event: Event) => {
			validateField(userSettingsSchema.phone, { event });
		},
	}
);
const emailInput = new Input(
	{
		type: 'text',
		name: 'email',
		value: user?.email || '',
		errorText: 'Ошибка валидации почты',
	},
	{
		blur: (event: Event) => {
			validateField(userSettingsSchema.email, { event });
		},
	}
);
const displayNameInput = new Input(
	{
		type: 'text',
		name: 'display_name',
		value: user?.display_name || '',
	},
	{}
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
		errorText: 'Ошибка валидации пароля',
	},
	{
		blur: (event: Event) => {
			validateField(passwordSettingsSchema.password, { event });
		},
	}
);
const newPasswordAgain = new Input(
	{
		type: 'password',
		name: 'newPasswordAgain',
		placeholder: 'Новый пароль еще раз',
		errorText: 'Ошибка валидации повторного ввода пароля',
	},
	{
		blur: (event: Event) => {
			validateField(passwordSettingsSchema.password, { event });
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
	avatar: user?.avatar || '',
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
		submit: async (event: Event) => {
			const form = event.target as HTMLFormElement;
			const formData = new FormData(form);

			const data = {
				first_name: formData.get('first_name'),
				second_name: formData.get('second_name'),
				login: formData.get('login'),
				phone: formData.get('phone'),
				email: formData.get('email'),
				display_name: formData.get('display_name'),
			};

			validateForm(form, userSettingsSchema);

			await UserController.updateUserInfo(data);

			if ((formData.get('avatar') as File).name.length) {
				await UserController.updateUserAvatar(formData.get('avatar') as File);
			}

			window.location.reload();
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
		submit: async (event: Event) => {
			const form = event.target as HTMLFormElement;
			const formData = new FormData(form);

			const data = {
				oldPassword: formData.get('oldPassword'),
				newPassword: formData.get('newPassword'),
				newPasswordAgain: formData.get('newPasswordAgain'),
			};
			const schema = {
				newPassword: { ...passwordSettingsSchema.password },
				newPasswordAgain: {
					// eslint-disable-next-line @typescript-eslint/ban-ts-comment
					//@ts-ignore
					matches: data.newPassword.toString(),
				},
			};

			validateForm(form, schema);

			await UserController.updateUserPassword(data);
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
