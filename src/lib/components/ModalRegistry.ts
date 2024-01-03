import type { ModalComponent } from '@skeletonlabs/skeleton';
import FilterPage from './FilterPage.svelte';

export const modalRegistry: Record<string, ModalComponent> = {
	// Set a unique modal ID, then pass the component reference
	FilterPage: { ref: FilterPage },
};
