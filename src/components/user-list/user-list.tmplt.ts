import Handlebars from 'handlebars';

const template = `
    <ul class="user-list">
        Нажмите на пользователя, чтобы удалить
         {{#each userList}}
            {{{this}}}
         {{/each}}
    </ul>
`;

export const userListTemplate = Handlebars.compile(template);
