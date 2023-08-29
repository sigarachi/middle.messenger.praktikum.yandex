import Handlebars from 'handlebars';

const template = `<div class="search-wrapper">
    <div class="user-wrapper">
       {{user}}
       <br />
       <a href="/create-chat">Создать чат</a>
        {{{settingsButton}}}
       {{{logoutButton}}}
    </div>
    {{{searchForm}}}
</div>`;

export const searchTemplate = Handlebars.compile(template);
