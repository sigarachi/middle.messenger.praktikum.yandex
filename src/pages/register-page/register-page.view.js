import Handlebars from 'handlebars';
import { button, input, link } from '../../components/index.js';
import './styles.css';
import '../../utils/utils.css';

const loginInput = input({ type: 'text', name: 'login', text: 'Логин' });
const firstNameInput = input({ type: 'text', name: 'name', text: 'Имя' });
const secondNameInput = input({
	type: 'text',
	name: 'secondName',
	text: 'Фамилия',
});
const passwordInput = input({
	type: 'password',
	name: 'password',
	text: 'Логин',
});
const emailInput = input({ type: 'text', name: 'email', text: 'Email' });
const phoneInput = input({ type: 'text', name: 'phone', text: 'Телефон' });
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
