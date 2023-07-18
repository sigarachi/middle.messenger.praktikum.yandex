import Handlebars from 'handlebars';
import { button, input, link } from '../../components/index.js';
import './styles.css';
import '../../utils/utils.css';

const loginInput = input({ type: 'text', text: 'Логин' });
const firstNameInput = input({ type: 'text', text: 'Имя' });
const secondNameInput = input({ type: 'text', text: 'Фамилия' });
const passwordInput = input({ type: 'password', text: 'Логин' });
const emailInput = input({ type: 'text', text: 'Email' });
const phoneInput = input({ type: 'text', text: 'Телефон' });
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
