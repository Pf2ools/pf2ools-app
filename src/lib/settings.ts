import { localStorageStore } from '@skeletonlabs/skeleton';
import { get } from 'svelte/store';

const defaults = {
	debug: {
		borders: false,
	},
};

export const settings = {
	...localStorageStore('settings', defaults),
	get get(): typeof defaults {
		return get(this);
	},
	setSetting(value: typeof defaults) {
		this.set({ ...get(this), ...value });
	},
};

window.settings = settings;
