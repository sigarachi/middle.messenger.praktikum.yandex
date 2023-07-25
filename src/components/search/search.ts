import './styles.css';
import { Input } from '../input';
import { Button } from '../button';
import { Form } from '../form';
import { searchFormTemplate } from './search-form.tmplt';
import { Block } from '../../blocks';
import { searchTemplate } from './search.tmplt';

const searchInput = new Input({
	type: 'text',
	name: 'search',
	placeholder: 'Поиск',
});

const searchButton = new Button({
	text: 'Найти',
	type: 'submit',
});

const searchFormContext = {
	searchInput: searchInput.transformToString(),
	searchButton: searchButton.transformToString(),
};

const searchForm = new Form(
	{
		dataId: 'search-form',
		className: 'search-form',
		content: searchFormTemplate(searchFormContext),
	},
	{
		submit: (event) => {
			const formData = new FormData(event.target);

			console.log(Object.values(formData));
		},
	}
).transformToString();

export class Search extends Block {
	constructor(context, events = {}) {
		super('div', {
			events,
			template: searchTemplate({ ...context, searchForm: searchForm }),
		});
	}
}
