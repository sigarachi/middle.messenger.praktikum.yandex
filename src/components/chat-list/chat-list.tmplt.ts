import Handlebars from 'handlebars';

Handlebars.registerHelper('json', function (context) {
	return JSON.stringify(context);
});

const template = `
    <div class="list-container">
     {{#each listData}}

        {{{this}}}

    {{/each}}
</div>
`;

export const chatListTemplate = Handlebars.compile(template);
