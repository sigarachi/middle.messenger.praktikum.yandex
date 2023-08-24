import Handlebars from 'handlebars';

const template = `
        <div class="list-item" data-id="{{dataId}}">
            <div class="list-item-avatar" data-id="{{dataId}}">
            </div>
            <div class="list-item-text" data-id="{{dataId}}">
                <div class="list-item-title" data-id="{{dataId}}">{{this.title}}</div>
                <div class="list-item-message" data-id="{{dataId}}">{{this.description}}</div>
            </div>
        </div> 
`;

export const chatItemTemplate = Handlebars.compile(template);
