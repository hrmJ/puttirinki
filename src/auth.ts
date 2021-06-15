import { writable } from 'svelte/store';
import { processResponse, requestState } from './apiCalls';
import type { AuthResponse, signupData, User } from './types';

const authenticateByResponse = async (resp: Response): Promise<boolean> => {
	if (!resp.ok) {
		return false;
	}
	const json: AuthResponse = await resp.json();
	localStorage.setItem('accessToken', json.accessToken);
	localStorage.setItem('userID', json.user._id);
	return true;
};

export const setAuthToken = async (email: string, password: string): Promise<boolean> => {
	try {
		const url = `http://${import.meta.env.VITE_API_URL}/authentication`;
		const resp = await fetch(url, {
			method: 'POST',
			mode: 'cors',
			headers: {
				'content-type': 'application/json'
			},
			body: JSON.stringify({ strategy: 'local', email, password })
		});
		return authenticateByResponse(resp);
	} catch (error) {
		console.log('NETWORK ERROR', error);
	}
	return false;
};

export const submitSignUp = async (
	validated: boolean,
	signupData: signupData
): Promise<requestState | null> => {
	console.log('submittingg....');
	if (!validated) {
		return null;
	}
	console.log('GO!', signupData);
	try {
		const url = `http://${import.meta.env.VITE_API_URL}/users`;
		const resp = await fetch(url, {
			method: 'POST',
			mode: 'cors',
			headers: {
				'content-type': 'application/json'
			},
			body: JSON.stringify(signupData)
		});
		return processResponse(resp);
	} catch (error) {
		console.log('NETWORK ERROR', error);
	}
	return requestState.ERROR;
};

const processUserResponse = (
	resp: Response,
	user: Pick<User, '_id' | 'name'> | null
): Pick<User, '_id' | 'name'> | null => {
	if (!resp.ok) {
		return null;
	}
	return user;
};

const getCurrentUserDetails = async (): Promise<Pick<User, '_id' | 'name'> | null> => {
	const id = localStorage.getItem('userID');
	let resp: Response | null;
	let user: Pick<User, '_id' | 'name'> | null;
	try {
		const url = `http://${import.meta.env.VITE_API_URL}/users/${id}`;
		resp = await fetch(url, {
			headers: {
				'content-type': 'application/json',
				Authorization: `Bearer ${localStorage.getItem('accessToken')}`
			},
			mode: 'cors'
		});
		user = await resp.json();
	} catch (error) {
		user = null;
		resp = null;
	}
	return processUserResponse(resp, user);
};

export const hasAuthToken = (): boolean => {
	return !(localStorage.getItem('accessToken') === null);
};

export const setUser = async () => {
	const userDetails = await getCurrentUserDetails();
	if (!userDetails) {
		return null;
	}
	return { ...userDetails };
};

export const authStore = writable(setUser());
