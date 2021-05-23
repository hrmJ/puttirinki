<script lang="ts">
	import HitButton from '../lib/HitButton.svelte';
	import LoadingIndicator from '../lib/LoadingIndicator.svelte';
	import CustomButton from '../lib/CustomButton.svelte';
	import { hitStore } from '../hitStore';
	import { requestState } from '../apiCalls';
	let total = 0;
	hitStore.subscribe((score) => {
		total = Object.values(score).reduce((prev, cur) => prev + cur, 0);
	});
	let saveState: requestState = requestState.IDLE;
	const saveSession = async () => {
		saveState = requestState.STARTED;
		saveState = await hitStore.saveSession();
    setTimeout(() => (saveState = requestState.IDLE), 3000);
	};
</script>

<LoadingIndicator message="Setti tallennettu!" state={saveState} />
<div class="grid-container">
	{#if saveState !== requestState.STARTED}
		<div class="button-container topmiddle">
			<HitButton on:hit={() => hitStore.addTop()} val={$hitStore.top} />
		</div>
		<div class="button-container centermiddle">
			<HitButton isPrimary on:hit={() => hitStore.addHit()} val={$hitStore.hit} />
		</div>
		<div class="button-container bottommiddle">
			<HitButton on:hit={() => hitStore.addBottom()} val={$hitStore.bottom} />
		</div>
		<div class="button-container rightmiddle">
			<HitButton on:hit={() => hitStore.addRight()} val={$hitStore.right} />
		</div>
		<div class="button-container leftmiddle">
			<HitButton on:hit={() => hitStore.addLeft()} val={$hitStore.left} />
		</div>
	{/if}
</div>

<nav>
	<div>{$hitStore.hit} / {total}</div>
	<div><CustomButton on:click={() => saveSession()}>Setti valmis!</CustomButton></div>
</nav>

<style type="text/css" media="screen">
	nav {
		display: flex;
		align-items: center;
		justify-content: space-between;
		height: 2rem;
	}

	.grid-container {
		display: grid;
		height: calc(97vh - 2rem - 2rem);
		max-width: 680px;
		margin: 3rem auto;
		grid-template-columns: 25% 50% 25%;
		grid-template-rows: 1fr 1fr 1fr;
		gap: 0px 0px;
		grid-template-areas:
			'. topmiddle .'
			'leftmiddle centermiddle rightmiddle'
			'. bottommiddle .';
	}

	.button-container {
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.topmiddle {
		grid-area: topmiddle;
	}

	.centermiddle {
		grid-area: centermiddle;
	}

	.bottommiddle {
		grid-area: bottommiddle;
	}

	.rightmiddle {
		grid-area: rightmiddle;
	}

	.leftmiddle {
		grid-area: leftmiddle;
	}
</style>
