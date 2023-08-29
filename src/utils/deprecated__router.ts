import { AuthPage, RegisterPage } from '../pages';
import { pageNotFound } from '../pages';
import { ChatPage } from '../pages/chat-page';

const authPage = new AuthPage();
const registerPage = new RegisterPage();

export const deprecated__routes = [
	{ path: '/auth', component: () => authPage.transformToString() },
	{ path: '/register', component: () => registerPage.transformToString() },
	{
		path: '/',
		component: () => new ChatPage({ settingsOpen: false }).transformToString(),
	},
	{
		path: '/settings',
		component: () => new ChatPage({ settingsOpen: true }).transformToString(),
	},
];

export const matchRoute = (path = '') => {
	const founded = deprecated__routes.filter((item) => item.path === path)[0];

	if (!founded) return () => pageNotFound;

	return founded.component;
};
