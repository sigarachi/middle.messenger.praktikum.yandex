import './styles.css';
import Handlebars from 'handlebars';

const template = `
    <div class="list-container">
     {{#each listData}}
        <div class="list-item">
            <div class="list-item-avatar"></div>
            <div class="list-item-text">
                <div class="list-item-title">{{this.title}}</div>
                <div class="list-item-message">{{this.description}}</div>
            </div>
        </div> 
    {{/each}}
</div>
`;

export const chatList = Handlebars.compile(template);
