import { writable } from 'svelte/store';

export type statusStoreContent = {
	show: boolean;
};

export const statusStore = writable({ show: false });
