const c = [
	() => import("../../../src/routes/__layout.svelte"),
	() => import("../components/error.svelte"),
	() => import("../../../src/routes/index.svelte"),
	() => import("../../../src/routes/dashboard.svelte"),
	() => import("../../../src/routes/practice.svelte"),
	() => import("../../../src/routes/login.svelte")
];

const d = decodeURIComponent;

export const routes = [
	// src/routes/index.svelte
	[/^\/$/, [c[0], c[2]], [c[1]]],

	// src/routes/dashboard.svelte
	[/^\/dashboard\/?$/, [c[0], c[3]], [c[1]]],

	// src/routes/practice.svelte
	[/^\/practice\/?$/, [c[0], c[4]], [c[1]]],

	// src/routes/login.svelte
	[/^\/login\/?$/, [c[0], c[5]], [c[1]]]
];

export const fallback = [c[0](), c[1]()];