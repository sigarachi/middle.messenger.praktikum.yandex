import Handlebars from 'handlebars';

const template = `
<div class="full-size-wrapper">
		<div class="left-size-wrapper">
			{{{searchWrapper}}}
			{{{list}}}
		</div>
		<div class="right-size-wrapper">
		{{#if settingsOpen}}
			{{{settings}}}
		{{else}}
			{{{chat}}}
		{{/if}}
		</div>
	</div>
`;

export const chatPageTemplate = Handlebars.compile(template);
