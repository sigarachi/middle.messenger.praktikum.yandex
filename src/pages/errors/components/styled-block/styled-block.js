import './styles.css';
import Handlebars from 'handlebars';

const template = `
    <div class="full_size__wrapper">
        <div class="block__container">
           <div class="block__header">{{header}}</div>
           <div class="block__description">{{description}}</div>
           {{link}}
        </div>
    </div>
`;

export const styledBlock = Handlebars.compile(template);
