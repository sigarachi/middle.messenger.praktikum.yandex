import Handlebars from 'handlebars';

export const template = `
<div class="full-size-wrapper">
   {{{content}}}
</div>`;

export const authPageTemplate = Handlebars.compile(template);
