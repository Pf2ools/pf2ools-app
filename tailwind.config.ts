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
		extend: {
			scale: {
				'200': '2',
			},
			spacing: {
				'1/10': '10%',
				'2/10': '20%',
				'3/10': '30%',
				'4/10': '40%',
				'5/10': '50%',
				'6/10': '60%',
				'7/10': '70%',
				'8/10': '80%',
				'9/10': '90%',
			},
			fontFamily: {
				flavor: ['var(--theme-font-family-flavor)'],
				action: ['pathfinder2eactions'],
			},
		},
		container: {
			center: true,
			padding: {
				DEFAULT: '1rem',
				sm: '2rem',
				lg: '4rem',
				xl: '6rem',
				'2xl': '8rem',
			},
		},
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
