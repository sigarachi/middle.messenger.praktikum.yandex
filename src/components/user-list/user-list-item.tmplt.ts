import Handlebars from 'handlebars';

const template = `
    <li class="user-item" data-id="{{dataId}}">
        {{display_name}}
    </li>
`;

export const userListItemTemplate = Handlebars.compile(template);
