import { defineConfig } from 'vite';
import handlebars from 'vite-plugin-handlebars';
import { resolve } from 'path';

export default defineConfig({
	// eslint-disable-next-line no-undef
	root: resolve(__dirname, ''),
	plugins: [
		handlebars({
			// eslint-disable-next-line no-undef
			partialDirectory: resolve(__dirname, 'partial'),
		}),
	],
});
