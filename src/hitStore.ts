import { writable } from 'svelte/store';
import { processResponse, requestState } from './apiCalls';
import { initializeStore, statsStore } from './statStore';

export type hitStoreContent = {
	right: number;
	left: number;
	top: number;
	bottom: number;
	hit: number;
	distance: number;
	showStats: boolean;
};

const defaultVal = {
	right: 0,
	left: 0,
	top: 0,
	bottom: 0,
	hit: 0,
	distance: 3,
	showStats: false
};

const { subscribe, update, set } = writable({ ...defaultVal } as hitStoreContent);

const saveSession = async (hits: hitStoreContent): Promise<requestState> => {
	try {
		const url = `${import.meta.env.VITE_API_URL}/practiceSessions`;
		const resp = await fetch(url, {
			headers: {
				'content-type': 'application/json',
				Authorization: `Bearer ${localStorage.getItem('accessToken')}`
			},
			method: 'POST',
			mode: 'cors',
			body: JSON.stringify(hits)
		});
		return processResponse(resp);
	} catch (error) {
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
	updateDistance: (distance: number): void => update((hits) => ({ ...hits, distance })),
	toggleStats: (showStats: boolean): void => update((hits) => ({ ...hits, showStats })),
	saveSession: async (): Promise<requestState> => {
		const resp = await saveSession(currentHits);
		statsStore.update(initializeStore);
		set({ ...defaultVal, showStats: true });
		return resp;
	}
};

let currentHits = { ...defaultVal };
hitStore.subscribe((hits) => (currentHits = hits));
