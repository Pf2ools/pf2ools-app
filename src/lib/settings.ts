import { localStorageStore } from '@skeletonlabs/skeleton';
import { get } from 'svelte/store';
import { dev } from '$app/environment';

const defaults = {
	debug: {
		borders: false,
	},
	clearFooter: dev ? true : false,
	wideMode: false,
	listSize: 'text-sm' as 'text-xs' | 'text-sm' | 'text-base' | 'text-lg',
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

window.settings = settings;
