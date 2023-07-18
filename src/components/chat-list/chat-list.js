import './styles.css';
import Handlebars from 'handlebars';

const template = `
    <div class="list__container">
     {{#each listData}}
        <div class="list__item">
            <div class="list__item-avatar"></div>
            <div class="list__item-text">
                <div class="list__item-title">{{this.title}}</div>
                <div class="list__item-message">{{this.description}}</div>
            </div>
        </div> 
    {{/each}}
</div>
`;

export const chatList = Handlebars.compile(template);
