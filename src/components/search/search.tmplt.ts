import Handlebars from 'handlebars';

const template = `<div class="search-wrapper">
    <div class="user-wrapper">
       {{user}}
    </div>
    {{{searchForm}}}
</div>`;

export const searchTemplate = Handlebars.compile(template);
