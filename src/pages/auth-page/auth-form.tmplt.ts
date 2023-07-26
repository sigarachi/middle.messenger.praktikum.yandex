import Handlebars from 'handlebars';
import './styles.css';

const template = `
    <form class="form-wrapper">
        <p class="form-header">
            Вход
        </p>
        <div class="input-wrapper">
            {{{loginInput}}}
            {{{passwordInput}}}
       </div>
       <div class="input-wrapper">
            {{{authButton}}}
            {{{registerLink}}}
       </div>
   </form>
`;

export const authFormTemplate = Handlebars.compile(template);
