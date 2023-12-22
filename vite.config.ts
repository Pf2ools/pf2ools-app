import { defineConfig, splitVendorChunkPlugin } from 'vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { purgeCss } from 'vite-plugin-tailwind-purgecss';

export default defineConfig({
	build: {
		rollupOptions: {
			output: {
				manualChunks(id: string) {
					if (id.includes('pf2ools-data')) {
						return 'data-' + id.split('/').slice(-1)[0].split('.')[0];
					}
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
