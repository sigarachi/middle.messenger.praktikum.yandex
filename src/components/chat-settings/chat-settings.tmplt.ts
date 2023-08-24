import Handlebars from 'handlebars';

const template = `
        <div class="chat-settings-wrapper">
        <form>
        	<div class="user-info-wrapper">
    			<h3>Настройка чата</h3>
			</div>
            <div class="user-info-wrapper">
                {{{userList}}}
                {{{addUserForm}}}
            </div>
        </form>
        </div>
`;

export const chatSettingsTemplate = Handlebars.compile(template);
