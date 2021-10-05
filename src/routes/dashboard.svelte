<script lang="ts">
	import { initializeStore, statsStore } from '../statStore';
	import type { statStoreContent } from '../statStore';
	import { requestState } from '../apiCalls';
	import { hitStore } from '../hitStore';
	import { onMount } from 'svelte';
	import Chart from 'svelte-frappe-charts';
	import { comparisonOperator } from '../types';

	let distance: number = 3;
	let operator: comparisonOperator = comparisonOperator.GT;
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
	<div class="operator-container">
		<label>
			<input
				type="radio"
				value={comparisonOperator.LT}
				bind:group={operator}
				on:change={() => statsStore.set(initializeStore(distance, operator))}
			/>
			alle
		</label>
		<label>
			<input
				type="radio"
				value={comparisonOperator.EQ}
				bind:group={operator}
				on:change={() => statsStore.set(initializeStore(distance, operator))}
			/>
			tasan
		</label>
		<label>
			<input
				type="radio"
				value={comparisonOperator.GT}
				bind:group={operator}
				on:change={() => statsStore.set(initializeStore(distance, operator))}
			/>
			yli
		</label>
	</div>
	<div class="range-container">
		<input
			type="range"
			min="3"
			max="20"
			step="1"
			bind:value={distance}
			on:change={() => statsStore.set(initializeStore(distance, operator))}
		/>
		{distance} m
	</div>

	{#await $statsStore}
		<p>Ladataan tilastoja...</p>
	{:then stats}
		{#if stats.state === requestState.COMPLETE}
			<article class="chart-container">
				<Chart data={getChartData(stats)} type="bar" />
			</article>
			<article class="text">
				{#if !stats.data.sessionCount}
					<p>Ei tilastoja näillä parametreilla.</p>
				{:else}
					<ul>
						<li>
							{stats.data.sessionCount} settiä.
						</li>
						<li>
							{stats.data.total} heittoa.
						</li>
						<li>Osumaprosentti {((stats.data.hit / stats.data.total) * 100).toFixed(2)} %</li>
						<li>Vasemmalta ohi {((stats.data.left / stats.data.total) * 100).toFixed(2)} %</li>
						<li>
							Oikealta ohi {((stats.data.right / stats.data.total) * 100).toFixed(2)} %
						</li>
						<li>Yli {((stats.data.top / stats.data.total) * 100).toFixed(2)} %</li>
						<li>
							Ali {((stats.data.bottom / stats.data.total) * 100).toFixed(2)} %
						</li>
					</ul>
				{/if}
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
	.operator-container {
		margin-bottom: 1em;
		padding-left: 0.5em;
	}
	.range-container > *:first-child {
		margin-right: 1em;
	}
	.range-container {
		display: flex;
		align-items: center;
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
