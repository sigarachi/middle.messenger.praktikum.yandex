import Handlebars from 'handlebars';
import { button, input, link } from '../../components/index.js';
import './styles.css';
import '../../utils/utils.css';

const loginInput = input({ type: 'text', text: 'Логин' });
const passwordInput = input({ type: 'password', text: 'Пароль' });
const authButton = button({ text: 'Авторизация' });
const registerLink = link({ text: 'Нет аккаунта?', url: '/register' });

const template = `
<div class="full_size__wrapper">
   <form class="form__wrapper">
        <p class="form__header">
            Вход
        </p>
       <div class="input__wrapper">
            ${loginInput}
            ${passwordInput}
       </div>
       <div class="input__wrapper">
        ${authButton}
        ${registerLink}
       </div>
       
   </form>
</div>`;
export const authPage = Handlebars.compile(template);
