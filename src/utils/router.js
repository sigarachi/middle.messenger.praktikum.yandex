import { authPage, pageError, registerPage } from '../pages/index.js';
import { pageNotFound } from '../pages/index.js';
import { chatPage } from '../pages/chat-page/index.js';

export const routes = [
	{ path: '/auth', component: () => authPage({}) },
	{ path: '/register', component: () => registerPage({}) },
	{ path: '/', component: () => chatPage({ settingsOpen: false }) },
	{ path: '/settings', component: () => chatPage({ settingsOpen: true }) },
	{ path: '/fallback', component: () => pageError },
];

export const matchRoute = (path = '') => {
	const founded = routes.filter((item) => item.path === path)[0];

	if (!founded) return () => pageNotFound;

	return founded.component;
};
