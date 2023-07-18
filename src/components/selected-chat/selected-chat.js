import './styles.css';
import Handlebars from 'handlebars';
import { input } from '../input/index.js';
import { button } from '../button/index.js';

const messageInput = input({ type: 'text', text: 'Введите сообщение' });
const sendMessageButton = button({ text: 'Отправить' });

const template = `
   
        <div class="chat_title__wrapper">
            <p class="chat_title__text">
                {{title}}
            </p>
        </div>
        <div class="chat_messages__wrapper"></div>
        <div class="chat_input__wrapper">
            ${messageInput}
            ${sendMessageButton}
        </div>
  
`;

export const selectedChat = Handlebars.compile(template);
