import './styles.css';
import Handlebars from 'handlebars';
import { input } from '../input/index.js';

const searchInput = input({ type: 'text', text: 'Поиск' });

const template = `<div class="search__wrapper">
    <div class="user__wrapper">
       {{user}}
    </div>
    <div>${searchInput}</div>
</div>`;

export const search = Handlebars.compile(template);
