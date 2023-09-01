import Handlebars from 'handlebars';
import { BASE_API_URL } from '../../services/constants';

const template = `
        <div class="list-item" data-id="{{dataId}}">
            <div class="list-item-avatar" data-id="{{dataId}}">
             <img src="${BASE_API_URL}/resources/{{this.avatar}}" alt="avatar" />
            </div>
            <div class="list-item-text" data-id="{{dataId}}">
                <div class="list-item-title" data-id="{{dataId}}">{{this.title}}</div>
                <div class="list-item-message" data-id="{{dataId}}">{{this.last_message.user.display_name}} : {{this.last_message.content}}</div>
            </div>
        </div> 
`;

export const chatItemTemplate = Handlebars.compile(template);
