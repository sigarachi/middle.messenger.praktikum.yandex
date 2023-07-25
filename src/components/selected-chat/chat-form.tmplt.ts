import Handlebars from 'handlebars';

const template = `
    <form class="chat-input-wrapper">
            {{{messageInput}}}
            {{{sendMessageButton}}}
    </form>
`;

export const chatFormTemplate = Handlebars.compile(template);
