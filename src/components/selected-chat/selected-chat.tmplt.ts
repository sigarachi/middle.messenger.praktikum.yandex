import Handlebars from 'handlebars';

const template = `
        <div class="chat-wrapper">
            <div class="chat-title-wrapper">
                <p class="chat-title-text">
                    {{title}}
                </p>
            </div>
            <div class="chat-messages-wrapper">1</div>
            {{{content}}}
        </div>
`;

export const selectedChatTemplate = Handlebars.compile(template);
