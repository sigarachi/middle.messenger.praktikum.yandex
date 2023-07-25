import Handlebars from 'handlebars';

const template = `
        <form>
        	<div class="user-info-wrapper">
    			<h3>Аватар</h3>
   				{{{avatarInput}}}
			</div>
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
