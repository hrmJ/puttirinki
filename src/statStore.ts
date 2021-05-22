import { readable } from 'svelte/store';
import type { SessionResponse, SessionStats } from './types';

const compileStats = async (resp: Response): Promise<SessionStats> => {
	if (!resp.ok) {
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

const fetchStats = async (): Promise<SessionStats | null> => {
	try {
		const url = `http://${import.meta.env.VITE_API_URL}/practiceSessions`;
		const resp = await fetch(url, {
			headers: {
				'content-type': 'application/json',
				Authorization: 'Bearer' + localStorage.getItem('accessToken')
			},
			mode: 'cors'
		});
		return await compileStats(resp);
	} catch (error) {
		return null;
	}
};

export const stats = readable(null, (set) => {
	fetchStats()
		.then((resp) => set(resp))
		.catch(() => set(null));
	return () => null;
});
