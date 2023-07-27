import './styles.css';
import Handlebars from 'handlebars';

const template = `
    <div class="full-size-wrapper">
        <div class="block-container">
           <div class="block-header">{{header}}</div>
           <div class="block-description">{{description}}</div>
           {{link}}
        </div>
    </div>
`;

export const styledBlock = Handlebars.compile(template);
