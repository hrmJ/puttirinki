<script context="module" lang="ts">
	export interface Session {
		_id: string;
		right: number;
		left: number;
		top: number;
		bottom: number;
		hit: number;
		createdAt: Date;
		updatedAt: Date;
		__v: number;
	}

	export interface LoadResponse {
		total: number;
		limit: number;
		skip: number;
		data: Session[];
	}

	export async function load({ fetch }) {
		// TODO: per user
		const url = `http://${import.meta.env.VITE_API_URL}/practiceSessions`;
		const res = await fetch(url);
		if (res.ok) {
			const sessions: LoadResponse = await res.json();
			const calculated = sessions.data.reduce(
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
			return {
				props: {
					sessions: calculated
				}
			};
		}

		return {
			status: res.status,
			error: new Error(`Could not load stats!`)
		};
	}
</script>

<script language="ts">
	export let sessions;
</script>

<p>
	Morjes, Nunnunuuu, olet heittänyt yhteensä {sessions.sessionCount} settiä, ja kaikkiaan heittoja on
	tullut {sessions.total}!
</p>

<ul>
	<li>Osumaprosenttisi on {((sessions.hit / sessions.total) * 100).toFixed(2)} %</li>
	<li>Vasemmalta on mennyt ohi {((sessions.left / sessions.total) * 100).toFixed(2)} %</li>
	<li>Oikealta on mennyt ohi {((sessions.right / sessions.total) * 100).toFixed(2)} %</li>
	<li>Yli on suhahtanut {((sessions.top / sessions.total) * 100).toFixed(2)} %</li>
	<li>Alas on lipsahtanut {((sessions.bottom / sessions.total) * 100).toFixed(2)} %</li>
</ul>
