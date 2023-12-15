import { purgeCss } from 'vite-plugin-tailwind-purgecss';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	build: {
		minify: 'terser',
		terserOptions: {
			mangle: {
				reserved: ['contentManager'],
			},
		},
	},
	plugins: [sveltekit(), purgeCss()],
});
