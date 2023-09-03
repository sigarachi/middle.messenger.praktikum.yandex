import { expect } from 'chai';
import 'mocha';
import { DOMWindow, JSDOM } from 'jsdom';
import { Router } from './Router';

declare global {
	// eslint-disable-next-line @typescript-eslint/no-namespace
	namespace NodeJS {
		interface Global {
			document: Document;
			window: DOMWindow;
			navigator: Navigator;
		}
	}
}

new JSDOM('<body><div id="app"></div></body>', {
	url: 'http://localhost',
});

const window = global.window;

describe('Router tests', () => {
	let router: Router;

	beforeEach(() => {
		router = new Router('#app');
	});

	it('check if Router class is singleton', () => {
		const newRouter = new Router('#app');
		expect(newRouter).to.eq(router);
	});

	it('router.back should not affect on history.length', () => {
		const historyLength = window.history.length;
		router.back();
		expect(window.history.length).to.eq(historyLength);
	});

	it('router.forward should not affect on history.length', () => {
		const historyLength = window.history.length;
		router.forward();
		expect(window.history.length).to.eq(historyLength);
	});
});
