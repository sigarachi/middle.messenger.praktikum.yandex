import Handlebars from 'handlebars';
import './style.css';

const template = `
    <input class="form__input" type={{inputType}} placeholder={{text}} value={{value}} >
`;

export const input = Handlebars.compile(template);
