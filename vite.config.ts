import { defineConfig } from 'vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { purgeCss } from 'vite-plugin-tailwind-purgecss';

export default defineConfig({
	clearScreen: false,
	server: {
		strictPort: true,
	},
	envPrefix: [
		'VITE_',
		'TAURI_PLATFORM',
		'TAURI_ARCH',
		'TAURI_FAMILY',
		'TAURI_PLATFORM_VERSION',
		'TAURI_PLATFORM_TYPE',
		'TAURI_DEBUG',
	],
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
		target: process.env.TAURI_PLATFORM == 'windows' ? 'chrome105' : 'safari13',
		minify: !process.env.TAURI_DEBUG ? 'terser' : false,
		sourcemap: true,
	},
	plugins: [sveltekit(), purgeCss()],
});
