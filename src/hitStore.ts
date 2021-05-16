import { writable } from 'svelte/store';

export type hitStoreContent = {
	right: number;
	left: number;
	top: number;
	bottom: number;
	hit: number;
};

const { subscribe, update } = writable({
	right: 0,
	left: 0,
	top: 0,
	bottom: 0,
	hit: 0
} as hitStoreContent);

export const hitStore = {
	subscribe,
	addRight: () => update((hits) => ({ ...hits, right: hits.right + 1 })),
	addLeft: () => update((hits) => ({ ...hits, left: hits.left + 1 })),
	addTop: () => update((hits) => ({ ...hits, top: hits.top + 1 })),
	addBottom: () => update((hits) => ({ ...hits, bottom: hits.bottom + 1 })),
	addHit: () => update((hits) => ({ ...hits, hit: hits.hit + 1 }))
};
