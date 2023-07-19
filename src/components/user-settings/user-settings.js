import './styles.css';
import '../selected-chat/styles.css';
import Handlebars from 'handlebars';
import { input } from '../input/index.js';
import { button } from '../button/index.js';

const loginInput = input({ type: 'text', name: 'login', value: 'Тестовый' });
const secondNameInput = input({
	type: 'text',
	name: 'secondName',
	value: 'Тестовый',
});
const nameInput = input({ type: 'text', name: 'name', value: 'Тестовый' });
const phoneInput = input({ type: 'text', name: 'phone', value: 'Тестовый' });
const emailInput = input({ type: 'text', name: 'email', value: 'Тестовый' });
const displayNameInput = input({
	type: 'text',
	name: 'displayName',
	value: 'Тестовый',
});

const oldPasswordInput = input({
	type: 'password',
	name: 'password',
	placeholder: 'Старый пароль',
});
const newPassword = input({
	type: 'password',
	name: 'newPassword',
	placeholder: 'Новый пароль',
});
const newPasswordAgain = input({
	type: 'password',
	name: 'newPasswordAgain',
	placeholder: 'Новый пароль еще раз',
});

const saveInfoButton = button({ text: 'Сохранить' });
const savePasswordButton = button({ text: 'Сохранить пароль' });

const template = `
    <div class="chat_title__wrapper">
            <p class="chat-title__text">
                {{title}}
            </p>
    </div>
    <div class="user-settings__wrapper">
        <form>
            <div class="user-info__wrapper">
                ${loginInput}
                ${secondNameInput}
                ${nameInput}
                ${phoneInput}
                ${emailInput}
                ${displayNameInput}
            </div>
            <div class="user-info__save">
                ${saveInfoButton}
            </div>
        </form>
        <form class="user-info__wrapper">
            ${oldPasswordInput}
            ${newPassword}
            ${newPasswordAgain}
            ${savePasswordButton}
        </form>
    </div>
`;

export const userSettings = Handlebars.compile(template);
