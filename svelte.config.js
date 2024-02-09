import adapterStatic from '@sveltejs/adapter-static';
import adapterCloudflare from '@sveltejs/adapter-cloudflare';
import preprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: ['.svelte'],

	compilerOptions: {
		enableSourcemap: true,
	},

	preprocess: preprocess({
		postcss: true,
		sourceMap: true,
		aliases: [],
	}),

	vitePlugin: {
		inspector: {
			toggleKeyCombo: 'alt+shift+c',
		},
	},

	kit: {
		version: {
			// Not sure whether I should reverse the logic here.
			// Currently we are using the version from the environment variable, which has to be set outside.
			// This is meant to allow to have "no version" as per debug builds (next.pf2oo.ls) and "version" as per release builds
			// But we might want to instead have the versions by default and build timestamp with a debug flag. But then this can cause issues in terms of what version is what.
			name: process.env.VERSION ?? undefined,
		},

		adapter: process.env.CF_PAGES
			? adapterCloudflare()
			: adapterStatic({
					fallback: '404.html',
				}),

		paths: {
			base: process.argv.includes('dev') ? '' : process.env.BASE_PATH,
		},

		prerender: { handleHttpError: 'warn', origin: process.env.ORIGIN ? process.env.ORIGIN : undefined },
	},
};
export default config;
