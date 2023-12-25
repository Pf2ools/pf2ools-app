import type { settings } from '$lib/settings';
import type contentManager from '$lib/data/contentManager';

declare global {
	// preserve any customizations you have here
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface Platform {}
	}

	interface Window {
		settings: typeof settings;
		contentManager: typeof contentManager;
	}

	interface ViewTransition {
		updateCallbackDone: Promise<void>;
		ready: Promise<void>;
		finished: Promise<void>;
		skipTransition: () => void;
	}

	interface Document {
		startViewTransition(updateCallback: () => Promise<void>): ViewTransition;
	}
}

export {};
