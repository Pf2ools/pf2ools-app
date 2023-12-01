import { join } from 'path';
import type { Config } from 'tailwindcss';
import forms from '@tailwindcss/forms';
import { skeleton } from '@skeletonlabs/tw-plugin';
import { RemasterGreen } from './src/themes/RemasterGreen';
import { CoreRed } from './src/themes/CoreRed';

export default {
	darkMode: 'class',
	content: [
		'./src/**/*.{html,js,svelte,ts}',
		join(require.resolve('@skeletonlabs/skeleton'), '../**/*.{html,js,svelte,ts}'),
	],
	theme: {
		extend: {},
	},
	plugins: [
		forms,
		skeleton({
			themes: {
				custom: [RemasterGreen, CoreRed],
			},
		}),
	],
} satisfies Config;
