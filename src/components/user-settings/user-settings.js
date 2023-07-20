import './styles.css';
import '../selected-chat/styles.css';
import Handlebars from 'handlebars';
import { input } from '../input/index.js';
import { button } from '../button/index.js';

const avatarInput = input({ inputType: 'file', name: 'avatar' });
const loginInput = input({
	inputType: 'text',
	name: 'login',
	value: 'Тестовый',
});
const secondNameInput = input({
	inputType: 'text',
	name: 'second_name',
	value: 'Тестовый',
});
const nameInput = input({
	inputType: 'text',
	name: 'first_name',
	value: 'Тестовый',
});
const phoneInput = input({
	inputType: 'text',
	name: 'phone',
	value: 'Тестовый',
});
const emailInput = input({
	inputType: 'text',
	name: 'email',
	value: 'Тестовый',
});
const displayNameInput = input({
	inputType: 'text',
	name: 'display_name',
	value: 'Тестовый',
});

const oldPasswordInput = input({
	inputType: 'password',
	name: 'oldPassword',
	placeholder: 'Старый пароль',
});
const newPassword = input({
	inputType: 'password',
	name: 'newPassword',
	placeholder: 'Новый пароль',
});
const newPasswordAgain = input({
	inputType: 'password',
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
    			<h3>Аватар</h3>
    			${avatarInput}
			</div>
		</form>
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
