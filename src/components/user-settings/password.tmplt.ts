import Handlebars from 'handlebars';

const template = `
{{{oldPasswordInput}}}
            {{{newPassword}}}
            {{{newPasswordAgain}}}
            {{{savePasswordButton}}}`;

export const passwordTemplate = Handlebars.compile(template);
