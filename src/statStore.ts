import { writable } from 'svelte/store';
import type { SessionResponse, SessionStats } from './types';
import { handleFetchError, handleResponseOrErrorString, requestState } from './apiCalls';

export type statStoreContent = {
	data: SessionStats | null;
	error: string | null;
	state: requestState;
};

const defaultVal = {
	error: null,
	data: null,
	state: requestState.IDLE
};

const { subscribe } = writable(<statStoreContent>{ ...defaultVal }, async (set) => {
	set({ ...defaultVal, state: requestState.STARTED });
	const resp = await fetchStats().catch(handleFetchError);
	set({ data: await compileStats(resp), ...handleResponseOrErrorString(resp) });
	return () => null;
});

const compileStats = async (resp: Response | string): Promise<SessionStats> => {
	if (typeof resp === 'string' || !resp.ok) {
		return null;
	}
	const sessionResponse: SessionResponse = await resp.json();
	return sessionResponse.data.reduce(
		(prev, cur) => {
			return {
				hit: prev.hit + cur.hit,
				left: prev.left + cur.left,
				right: prev.right + cur.right,
				top: prev.top + cur.top,
				bottom: prev.bottom + cur.bottom,
				total: prev.total + cur.hit + cur.left + cur.right + cur.top + cur.bottom,
				sessionCount: prev.sessionCount + 1
			};
		},
		{ hit: 0, left: 0, right: 0, total: 0, top: 0, bottom: 0, sessionCount: 0 }
	);
};

const fetchStats = async (): Promise<Response> => {
	const url = `http://${import.meta.env.VITE_API_URL}/practiceSessions`;
	return await fetch(url, {
		headers: {
			'content-type': 'application/json'
			//Authorization: 'Bearer' + localStorage.getItem('accessToken')
		},
		mode: 'cors'
	});
};

export const stats = {
	subscribe
};
