import Handlebars from 'handlebars';

const template = `<div class="full-size-wrapper">
  {{{content}}}
</div>`;

export const registerPageTemplate = Handlebars.compile(template);
