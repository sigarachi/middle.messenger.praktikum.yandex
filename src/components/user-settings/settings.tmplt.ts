import Handlebars from 'handlebars';

const template = `
        <form>
            
        	<div class="user-info-wrapper">
    			<h3>Аватар</h3>
    			<div>
    			<div class="list-item-avatar" data-id="{{dataId}}">
    			    <img src="https://ya-praktikum.tech/api/v2/resources/{{this.avatar}}" alt="avatar" />
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
