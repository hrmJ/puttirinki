import { writable } from 'svelte/store';

export type loginFormStore = {
	isLoading: boolean;
	errorMessage: string;
};

export default writable({ isLoading: false, errorMessage: '' });
