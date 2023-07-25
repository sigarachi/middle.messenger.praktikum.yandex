import Handlebars from 'handlebars';

const template = ` <form class="form-wrapper">
        <p class="form-header">
            Регистрация
        </p>
       <div class="input-wrapper">
            {{{loginInput}}}
            {{{firstNameInput}}}
            {{{secondNameInput}}}
            {{{passwordInput}}}
            {{{emailInput}}}
            {{{phoneInput}}}
       </div>
       <div class="input-wrapper">
        {{{authButton}}}
        {{{authLink}}}
       </div>
       
   </form>`;

export const registerFormTemplate = Handlebars.compile(template);
