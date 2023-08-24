// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck
import { routes } from './constants';

import { Route } from './Route';
import { Dictionary } from '../blocks';

export const APP_ROOT_QUERY = '.app';

export class Router {
	routes: Route[] = [];

	history: History;

	_currentRoute: Route | undefined;

	_rootQuery: string = '';

	static __instance: Router | null;

	notFoundRoute: Route | undefined;

	constructor(rootQuery: string) {
		if (Router.__instance) {
			return Router.__instance;
		}

		this.routes = [];
		this.history = window.history;
		this._currentRoute = undefined;

		this._rootQuery = rootQuery;

		Router.__instance = this;
	}

	use(pathname: string, block: Dictionary, context: Dictionary = {}) {
		const route: Route = new Route(pathname, block, {
			rootQuery: this._rootQuery,
			context,
		});
		this.routes.push(route);
		return this;
	}

	notFound(block: Dictionary, context: Dictionary = {}) {
		this.notFoundRoute = new Route(`/${routes.notFound}`, block, {
			rootQuery: this._rootQuery,
			context,
		});
		return this;
	}

	start() {
		window.onpopstate = (event: PopStateEvent & { currentTarget: Window }) => {
			this._onRoute(event.currentTarget.location.pathname);
		};

		this._onRoute(window.location.pathname);
	}

	_onRoute(pathname: string) {
		const route = this.getRoute(pathname);

		if (this._currentRoute && this._currentRoute !== route) {
			this._currentRoute.leave();
		}

		if (!route) {
			this.notFoundRoute?.navigate(`/${routes.notFound}`);
		} else {
			this._currentRoute = route;

			try {
				route.navigate(pathname);
			} catch (e) {
				this._currentRoute = this.notFoundRoute;
				this.notFoundRoute?.navigate(`/${routes.notFound}`);
			}
		}
	}

	go(pathname?: string) {
		if (pathname) {
			this.history.pushState({}, '', pathname);
			this._onRoute(pathname);
		} else {
			this.history.go();
		}
	}

	getRoute(pathname: string): Route | undefined {
		return this.routes.find((route) => route.match(pathname));
	}

	getCurrentRoute() {
		return this._currentRoute;
	}

	back() {
		this.history.back();
	}

	forward() {
		this.history.forward();
	}
}

export const router = new Router(APP_ROOT_QUERY);
