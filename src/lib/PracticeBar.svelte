<script lang="ts">
	import type { User } from 'src/types';
	import { hitStore } from '../hitStore';
	export let user: Pick<User, '_id' | 'name'> | null;
	let distance: number = 3;
</script>

{#if $hitStore.showStats && user !== null}
	<p>{distance} m</p>
	<input
		type="range"
		min="3"
		max="20"
		step="1"
    bind:value={distance}
		on:change={() => hitStore.updateDistance(distance)}
	/>
{/if}

<style>
	p {
		width: 3rem;
	}
</style>
