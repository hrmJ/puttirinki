import { writable } from 'svelte/store';
import { processResponse, requestState } from './apiCalls';

export type hitStoreContent = {
	right: number;
	left: number;
	top: number;
	bottom: number;
	hit: number;
};

const defaultVal = {
	right: 0,
	left: 0,
	top: 0,
	bottom: 0,
	hit: 0
};

const { subscribe, update, set } = writable({ ...defaultVal } as hitStoreContent);

const saveSession = async (hits: hitStoreContent): Promise<requestState> => {
	try {
		const url = `http://${import.meta.env.VITE_API_URL}/practiceSessions`;
		const resp = await fetch(url, {
			headers: { 'content-type': 'application/json' },
			method: 'POST',
			mode: 'cors',
			body: JSON.stringify(hits)
		});
		console.log(resp);
		return processResponse(resp);
	} catch (error) {
		console.log(error, 'haa');
		return requestState.ERROR;
	}
};

export const hitStore = {
	subscribe,
	addRight: (): void => update((hits) => ({ ...hits, right: hits.right + 1 })),
	addLeft: (): void => update((hits) => ({ ...hits, left: hits.left + 1 })),
	addTop: (): void => update((hits) => ({ ...hits, top: hits.top + 1 })),
	addBottom: (): void => update((hits) => ({ ...hits, bottom: hits.bottom + 1 })),
	addHit: (): void => update((hits) => ({ ...hits, hit: hits.hit + 1 })),
	saveSession: async (): Promise<requestState> => {
		const resp = await saveSession(currentHits);
		set({ ...defaultVal });
		return resp;
	}
};

let currentHits = { ...defaultVal };
hitStore.subscribe((hits) => (currentHits = hits));
