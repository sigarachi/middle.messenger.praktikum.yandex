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
import { validateField, validateForm } from '../../lib';
import { AuthService } from '../../services';
import { router } from '../../utils';
import { UserController } from '../../controllers';
import { ChatController } from '../../controllers/chat-controller';

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
const firstNameInput = new Input(
	{
		type: 'text',
		name: 'first_name',
		placeholder: 'Имя',
		errorText: 'Ошибка валидации имени',
	},
	{
		blur: (event: Event) => {
			validateField(userSettingsSchema.first_name, { event });
		},
	}
);
const secondNameInput = new Input(
	{
		type: 'text',
		name: 'second_name',
		placeholder: 'Фамилия',
		errorText: 'Ошибка валидации фамилии',
	},
	{
		blur: (event: Event) => {
			validateField(userSettingsSchema.second_name, { event });
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
const emailInput = new Input(
	{
		type: 'text',
		name: 'email',
		placeholder: 'Email',
		errorText: 'Ошибка валидации почты',
	},
	{
		blur: (event: Event) => {
			validateField(userSettingsSchema.email, { event });
		},
	}
);
const phoneInput = new Input(
	{
		type: 'text',
		name: 'phone',
		placeholder: 'Телефон',
		errorText: 'Ошибка валидации телефона',
	},
	{
		blur: (event: Event) => {
			validateField(userSettingsSchema.phone, { event });
		},
	}
);
const authButton = new Button({
	text: 'Зарегистрироваться',
	type: 'submit',
});
const authLink = new Link({
	text: 'Уже есть аккаунт?',
	url: '/',
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
		dataId: 'register-form',
	},
	{
		submit: (event: Event) => {
			event.preventDefault();
			const form = event.target as HTMLFormElement;
			const formData = new FormData(form);

			const data = {
				first_name: formData.get('first_name'),
				second_name: formData.get('second_name'),
				login: formData.get('login'),
				phone: formData.get('phone'),
				email: formData.get('email'),
				password: formData.get('password'),
			};

			const schema = { ...userSettingsSchema, ...passwordSettingsSchema };

			validateForm(form, schema);

			AuthService.signUp(data)
				.then(async () => {
					UserController.getUser().then(() => {
						ChatController.getChats().then(() => {
							window.location.href = '/messenger';
							//window.location.reload();
						});
					});
				})
				.catch((error) => {
					if (error.error.reason === 'User already in system')
						router.go('/messenger');
				});
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
