import Handlebars from 'handlebars';

const template = `
        <div class="chat-wrapper">
            <div class="chat-title-wrapper">
                 
                <p class="chat-title-text">
                    {{title}}
                 
                </p>
             {{{chatSettingsButton}}}
            </div>
            <div class="chat-messages-wrapper"></div>
            {{{content}}}
        </div>
`;

export const selectedChatTemplate = Handlebars.compile(template);
