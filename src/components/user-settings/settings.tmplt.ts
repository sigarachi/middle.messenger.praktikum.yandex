import Handlebars from 'handlebars';
import { BASE_API_URL } from '../../services/constants';

const template = `
        <form>
            
        	<div class="user-info-wrapper">
    			<h3>Аватар</h3>
    			<div>
    			<div class="list-item-avatar" data-id="{{dataId}}">
    			    <img src="${BASE_API_URL}/resources/{{this.avatar}}" alt="avatar" />
                </div>
   				{{{avatarInput}}}
                </div>
			</div>
			<br />
            <div class="user-info-wrapper">
                {{{loginInput}}}
               	{{{secondNameInput}}}
                {{{nameInput}}}
                {{{phoneInput}}}
               	{{{emailInput}}}
                {{{displayNameInput}}}
                {{{saveInfoButton}}}
            </div>
        </form>
`;

export const settingsTemplate = Handlebars.compile(template);
