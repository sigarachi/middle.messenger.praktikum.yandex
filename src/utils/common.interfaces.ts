import { Dictionary } from '../blocks';

export interface IRouter {
	use(pathname: string, block: Dictionary, context: Dictionary): IRouter;
	start(): void;
	go(pathname?: string): void;
	getCurrentRoute(): void;
	back(): void;
	back(): void;
	forward(): void;
	routes(): IRoute[];
}

export interface IRoute {
	navigate(pathname: string): void;
	leave(): void;
	match(pathname: string): boolean;
	render(): void;
}
