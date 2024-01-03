import { localStorageStore } from '@skeletonlabs/skeleton';
import type { filter } from './ItemList.svelte';
import { type Writable, get } from 'svelte/store';

export class FilterManager<T> {
	default: filter<T>[];
	enabled: Writable<filter<T>[]>;
	constructor(filters: filter<T>[], page: string) {
		this.default = filters;
		this.enabled = localStorageStore(`filters${page}`, []);
	}

	reset() {
		this.enabled.set(this.default);
	}

	get _enabled() {
		return get(this.enabled);
	}
}
