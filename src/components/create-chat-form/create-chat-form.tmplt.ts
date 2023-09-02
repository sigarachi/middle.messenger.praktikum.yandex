import Handlebars from 'handlebars';

const template = `
        <div class="chat-settings-wrapper">
        <form>
        	<div class="user-info-wrapper">
    			<h3>Создать чат</h3>
			</div>
            <div class="user-info-wrapper">
                {{{titleInput}}}
                {{{createButton}}}
            </div>
        </form>
        </div>
`;

export const createFormTemplate = Handlebars.compile(template);
