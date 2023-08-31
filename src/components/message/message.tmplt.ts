import Handlebars from 'handlebars';

const template = `<div id="{{id}}" class="message {{#if myMessage}} my {{else}} not-my {{/if}}">{{text}}</div>`;

export const messageTemplate = Handlebars.compile(template);
