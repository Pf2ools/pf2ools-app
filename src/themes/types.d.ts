import type { CustomThemeConfig } from '@skeletonlabs/tw-plugin';

export type ThemeConfig = CustomThemeConfig & {
	properties: ThemeConfigProps;
	properties_dark: ThemeConfigProps;
};

type ThemeConfigProps = {
	/* '--background-image'?: string; - Having tried replicating the 5eTools pattern, it was found to be laggy when transitioning between pages. */
};
