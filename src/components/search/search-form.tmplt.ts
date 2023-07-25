import Handlebars from 'handlebars';

const template = `
    {{{searchInput}}}
    {{{searchButton}}}
`;

export const searchFormTemplate = Handlebars.compile(template);
