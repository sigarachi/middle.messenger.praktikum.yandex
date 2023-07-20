import Handlebars from 'handlebars';
import { button, input, link } from '../../components/index.js';
import './styles.css';
import '../../utils/utils.css';

const loginInput = input({ inputType: 'text', name: 'login', text: 'Логин' });
const firstNameInput = input({
	inputType: 'text',
	name: 'first_name',
	text: 'Имя',
});
const secondNameInput = input({
	inputType: 'text',
	name: 'second_name',
	text: 'Фамилия',
});
const passwordInput = input({
	inputType: 'password',
	name: 'password',
	text: 'Логин',
});
const emailInput = input({ inputType: 'text', name: 'email', text: 'Email' });
const phoneInput = input({ inputType: 'text', name: 'phone', text: 'Телефон' });
const authButton = button({ text: 'Зарегистрироваться' });
const authLink = link({ text: 'Уже есть аккаунт?', url: '/auth' });

const template = `
<div class="full_size__wrapper">
   <form class="form__wrapper">
        <p class="form__header">
            Регистрация
        </p>
       <div class="input__wrapper">
            ${loginInput}
            ${firstNameInput}
            ${secondNameInput}
            ${passwordInput}
            ${emailInput}
            ${phoneInput}
       </div>
       <div class="input__wrapper">
        ${authButton}
        ${authLink}
       </div>
       
   </form>
</div>`;
export const registerPage = Handlebars.compile(template);
