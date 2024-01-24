import { localStorageStore } from '@skeletonlabs/skeleton';
import { get } from 'svelte/store';
import { dev } from '$app/environment';

const defaults = {
	debug: {
		borders: false,
	},
	clearFooter: dev ? true : false,
	wideMode: window?.__TAURI__ ? true : false,
	listSize: 'text-sm' as 'text-xs' | 'text-sm' | 'text-base' | 'text-lg',
	theme: 'CoreRed' as 'CoreRed' | 'RemasterGreen',
};

export const settings = {
	...localStorageStore('settings', defaults),
	get get(): typeof defaults {
		return get(this);
	},
	setSetting(value: typeof defaults) {
		this.set({ ...get(this), ...value });
	},
	default() {
		this.set(defaults);
	},
};

if (window) window.settings = settings;

settings.subscribe((value) => {
	// When value.theme changes, update the body `data-theme` attribute
	document.querySelector('body')?.setAttribute('data-theme', value.theme ?? 'CoreRed');
});
