import { defineConfig, splitVendorChunkPlugin } from 'vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { purgeCss } from 'vite-plugin-tailwind-purgecss';

export default defineConfig({
	build: {
		rollupOptions: {
			output: {
				manualChunks(id: string) {
					if (id.includes('pf2ools-data')) return 'pf2ools-data';
				},
			},
		},
		minify: 'terser',
		terserOptions: {
			mangle: {
				reserved: ['contentManager'],
			},
		},
	},
	plugins: [sveltekit(), purgeCss(), splitVendorChunkPlugin()],
});
