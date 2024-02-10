import { homebrewSources as homebrewSourcesSchema } from 'pf2ools-schema';
import type { z } from 'zod';
import contentManager from '../contentManager.ts';
import { derived, get, type Readable } from 'svelte/store';
import { dateConvert } from '$lib/utils';
import { dev } from '$app/environment';

export type homebrewSource = z.infer<typeof homebrewSourcesSchema>[number];

class HomebrewSource {
	private _document: homebrewSource;
	public path: homebrewSource['path'];
	public released: homebrewSource['released'];
	public added: homebrewSource['added'];
	public modified: homebrewSource['modified'];
	public URL: homebrewSource['URL'];
	public ID: homebrewSource['ID'];
	public fullTitle: homebrewSource['fullTitle'];
	public publisherAuthors: homebrewSource['publisherAuthors'];
	public datatypes: homebrewSource['datatypes'];
	public tags: homebrewSource['tags'];
	public sourceURL: homebrewSource['sourceURL'];

	constructor(homebrewSource: homebrewSource) {
		this._document = homebrewSource;
		this.path = homebrewSource.path;
		this.released = homebrewSource.released;
		this.added = homebrewSource.added;
		this.modified = homebrewSource.modified;
		this.URL = homebrewSource.URL;
		this.ID = homebrewSource.ID;
		this.fullTitle = homebrewSource.fullTitle;
		this.publisherAuthors = homebrewSource.publisherAuthors;
		this.datatypes = homebrewSource.datatypes;
		this.tags = homebrewSource.tags;
		this.sourceURL = homebrewSource.sourceURL;
	}

	get isInstalled(): Readable<boolean> {
		return derived(contentManager.homebrew, () => contentManager.brewIDs.includes(this.ID));
	}

	get _isInstalled(): boolean {
		return get(this.isInstalled);
	}

	get isThereNewerVersion(): Readable<boolean> {
		return derived(contentManager.homebrew, () => {
			const existingSource = contentManager.sourceByID.get(this.ID);
			const date = existingSource?.data.modified ?? 0;
			if (dev)
				console.log(
					'Checking for newer version of ' +
						this.fullTitle +
						'\n' +
						date +
						' (existing) vs ' +
						this.modified +
						' (incoming)'
				);
			return dateConvert(date) < dateConvert(this.modified);
		});
	}

	get updateAvailable() {
		return this._isInstalled && this._isThereNewerVersion;
	}

	get _isThereNewerVersion(): boolean {
		return get(this.isThereNewerVersion);
	}

	deleteFromHomebrew(): void {
		contentManager.removeID(this.ID);
	}

	async addToHomebrew() {
		await contentManager.addHomebrewFromUrl(this.downloadURL);
	}

	get downloadURL(): string {
		return this.sourceURL + '/' + this.path;
	}

	get label(): string {
		return this.fullTitle;
	}

	get hash(): string {
		return encodeURI(this.label + '_' + this.ID);
	}

	get official(): boolean {
		return false;
	}

	get secondaryContent(): boolean {
		return false;
	}

	get homebrew(): boolean {
		return true;
	}
}

export default HomebrewSource;
