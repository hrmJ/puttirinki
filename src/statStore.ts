import { writable } from 'svelte/store';
import type { comparisonOperator, SessionStats } from './types';
import { handleFetchError, handleResponseOrErrorString, requestState } from './apiCalls';

export type statStoreContent = {
	data: SessionStats | null;
	error: string | null;
	state: requestState;
};

const compileStats = async (resp: Response | string): Promise<SessionStats> => {
	if (typeof resp === 'string' || !resp.ok) {
		return null;
	}
	const sessionResponse: SessionStats = await resp.json();
	return sessionResponse;
};

const fetchStats = async (distance?: number, operator?: comparisonOperator): Promise<Response> => {
	const url = `${
		import.meta.env.VITE_API_URL
	}/practiceSessions?distance=${distance}&operator=${encodeURI(operator)}`;
	return await fetch(url, {
		headers: {
			'content-type': 'application/json',
			Authorization: `Bearer ${localStorage.getItem('accessToken')}`
		},
		mode: 'cors'
	});
};

export const initializeStore = async (
	distance?: number,
	operator?: comparisonOperator
): Promise<statStoreContent> => {
	const resp = await fetchStats(distance, operator).catch(handleFetchError);
	const ret = { data: await compileStats(resp), ...handleResponseOrErrorString(resp) };
	return ret;
};

export const statsStore = writable(initializeStore());
