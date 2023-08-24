import Handlebars from 'handlebars';

const template = `
        <form data-id="{{dataId}}">
            <div>
                {{{addUserInput}}}
                <br />
                {{{createButton}}}
            </div>
        </form>
`;

export const addUserFormTemplate = Handlebars.compile(template);
