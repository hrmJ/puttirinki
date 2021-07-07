<script lang="ts">
	import { statsStore } from '../statStore';
	import type { statStoreContent } from '../statStore';
	import { requestState } from '../apiCalls';
	import { hitStore } from '../hitStore';
	import { onMount } from 'svelte';
	import Chart from 'svelte-frappe-charts';
	onMount(() => hitStore.toggleStats(false));
	function getChartData({ data }: statStoreContent) {
		return {
			labels: ['Vasen', 'Oikea', 'Ylä', 'Ala', 'Kori'],
			datasets: [
				{
					values: [data.left, data.right, data.top, data.bottom, data.hit]
				}
			]
		};
	}
</script>

<main>
	{#await $statsStore}
		<p>Ladataan tilastoja...</p>
	{:then stats}
		{#if stats.state === requestState.COMPLETE}
			<article class="chart-container">
				<Chart
					data={getChartData(stats)}
					type="bar"
				/>
			</article>
			<article class="text">
				<p>
					Olet heittänyt yhteensä {stats.data.sessionCount} settiä. Kaikkiaan heittoja on kasassa {stats
						.data.total}!
				</p>

				<ul>
					<li>Osumaprosenttisi on {((stats.data.hit / stats.data.total) * 100).toFixed(2)} %</li>
					<li>
						Vasemmalta on mennyt ohi {((stats.data.left / stats.data.total) * 100).toFixed(2)} %
					</li>
					<li>
						Oikealta on mennyt ohi {((stats.data.right / stats.data.total) * 100).toFixed(2)} %
					</li>
					<li>Yli on suhahtanut {((stats.data.top / stats.data.total) * 100).toFixed(2)} %</li>
					<li>Alas on lipsahtanut {((stats.data.bottom / stats.data.total) * 100).toFixed(2)} %</li>
				</ul>
			</article>
		{:else}
			<p>Lataus ei onnistunut: {stats.error}</p>
		{/if}
	{/await}
</main>

<style>
	article {
		border-radius: 3px;
	}
	article + article {
		margin-top: 1rem;
	}
	.text {
		padding: var(--padding-md);
		background: lightgrey;
	}
	.chart-container {
		box-shadow: var(--shadow-sm);
	}
</style>
