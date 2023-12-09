import type { settings } from '$lib';

declare global {
	// preserve any customizations you have here
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface Platform {}
	}

	interface Window {
		settings: settings;
	}

	// add these lines
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
