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
		adapter: adapter({
			fallback: '404.html',
		}),
		paths: {
			base: process.argv.includes('dev') ? '' : process.env.BASE_PATH,
		},
	},
};
export default config;
