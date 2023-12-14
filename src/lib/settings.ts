import { localStorageStore } from '@skeletonlabs/skeleton';
import { get } from 'svelte/store';

const defaults = {
	debug: {
		borders: false,
	},
	clearFooter: false,
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
