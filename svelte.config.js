import adapter from '@sveltejs/adapter-static';
import preprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: ['.svelte'],
	preprocess: preprocess({
		sourceMap: true,
		aliases: [],
	}),

	vitePlugin: {
		inspector: true,
	},

	kit: {
		adapter: adapter(),
	},
};
export default config;
