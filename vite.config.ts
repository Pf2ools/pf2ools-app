import { defineConfig, splitVendorChunkPlugin } from 'vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { purgeCss } from 'vite-plugin-tailwind-purgecss';

export default defineConfig({
	build: {
		minify: 'terser',
		terserOptions: {
			mangle: {
				reserved: ['contentManager'],
			},
		},
	},
	plugins: [sveltekit(), purgeCss(), splitVendorChunkPlugin()],
});
