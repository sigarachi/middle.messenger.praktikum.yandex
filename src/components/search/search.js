import './styles.css';
import Handlebars from 'handlebars';
import { input } from '../input/index.js';

const searchInput = input({ type: 'text', name: 'search', text: 'Поиск' });

const template = `<div class="search__wrapper">
    <div class="user__wrapper">
       {{user}}
    </div>
    <form>${searchInput}</form>
</div>`;

export const search = Handlebars.compile(template);
