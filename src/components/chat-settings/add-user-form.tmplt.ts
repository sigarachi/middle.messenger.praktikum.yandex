import Handlebars from 'handlebars';

const template = `
        <div>
            {{{addUserInput}}}
            <br />
            {{{createButton}}}
        </div>
`;

export const addUserFormTemplate = Handlebars.compile(template);
