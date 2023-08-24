export const render = (block: any) => {
	const app: HTMLElement | null = document.getElementById('app');
	if (app) app.innerHTML = block.transformToString();
};
