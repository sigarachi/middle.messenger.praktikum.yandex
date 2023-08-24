import Handlebars from 'handlebars';

const template = `<div class="search-wrapper">
    <div class="user-wrapper">
       {{user}}
       <br />
       <a href="/create-chat">Создать чат</a>
    </div>
    {{{searchForm}}}
</div>`;

export const searchTemplate = Handlebars.compile(template);
