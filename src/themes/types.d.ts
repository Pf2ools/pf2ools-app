import type { CustomThemeConfig } from '@skeletonlabs/tw-plugin';

export type ThemeConfig = CustomThemeConfig & {
	properties: ThemeConfigProps;
	properties_dark: Partial<ThemeConfigProps>;
};

type ThemeConfigProps = {
	// interact | #337AB7
	'--color-interact-50': string; // #e0ebf4
	'--color-interact-100': string; // #d6e4f1
	'--color-interact-200': string; // #ccdeed
	'--color-interact-300': string; // #adcae2
	'--color-interact-400': string; // #70a2cd
	'--color-interact-500': string; // #337AB7
	'--color-interact-600': string; // #2e6ea5
	'--color-interact-700': string; // #265c89
	'--color-interact-800': string; // #1f496e
	'--color-interact-900': string; // #193c5a
	/* '--background-image'?: string; - Having tried replicating the 5eTools pattern, it was found to be laggy when transitioning between pages. */
};
