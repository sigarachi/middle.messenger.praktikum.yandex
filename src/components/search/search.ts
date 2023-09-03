import './styles.scss';
import { Input } from '../input';
import { Button } from '../button';
import { Form } from '../form';
import { searchFormTemplate } from './search-form.tmplt';
import { Block } from '../../blocks';
import { searchTemplate } from './search.tmplt';
import { AuthService } from '../../services';
import { router } from '../../utils';
import { Store } from '../../lib/store';

const searchInput = new Input({
	type: 'text',
	name: 'search',
	placeholder: 'Поиск',
});

const searchButton = new Button({
	text: 'Найти',
	type: 'submit',
});

const settingsButton = new Button(
	{
		text: 'Настройки',
		dataId: 'toSettingsButton',
		className: 'link',
	},
	{
		click: () => {
			router.go('/settings');
		},
	}
);

const logoutButton = new Button(
	{
		text: 'Выйти',
		dataId: 'logoutButton',
		className: 'link',
	},
	{
		click: async () => {
			await AuthService.logout();
			localStorage.clear();
			Store.clearStore();
			router.go('/');
		},
	}
);

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
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		//@ts-ignore
		submit: (event) => {
			new FormData(event.target);
		},
	}
).transformToString();

interface ISearchProps {
	user?: string;
}

export class Search extends Block {
	constructor(context: ISearchProps, events = {}) {
		super('div', {
			events,
			template: searchTemplate({
				...context,
				searchForm: searchForm,
				logoutButton: logoutButton.transformToString(),
				settingsButton: settingsButton.transformToString(),
			}),
		});
	}
}
