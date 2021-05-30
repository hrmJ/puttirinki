<script lang="ts">
	import HitButton from '../lib/HitButton.svelte';
	import LoadingIndicator from '../lib/LoadingIndicator.svelte';
	import CustomButton from '../lib/CustomButton.svelte';
	import { hitStore } from '../hitStore';
	import { requestState } from '../apiCalls';
	import { onMount } from 'svelte';
	let saveState: requestState = requestState.IDLE;
	const saveSession = async () => {
		saveState = requestState.STARTED;
		saveState = await hitStore.saveSession();
		setTimeout(() => (saveState = requestState.IDLE), 3000);
	};
	onMount(() => hitStore.toggleStats(true));
</script>

<main class="grid-container">
	<article class={saveState === requestState.IDLE ? 'message' : 'message' + ' open'}>
		<LoadingIndicator message="Setti tallennettu!" state={saveState} />
	</article>
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
</main>

<nav>
	<div class="chunky">
		<CustomButton customClass="chunky" on:click={() => saveSession()}>Setti valmis!</CustomButton>
	</div>
</nav>

<style type="text/css" media="screen">
	.message {
		padding: var(--padding-md);
    font-weight: var(--weight-light);
    font-size: var(--font-sm-2);
    display: flex;
    align-items: center;
    justify-content: center;
		background: lightgrey;
		position: absolute;
		z-index: 199;
		top: 9px;
		left: 5px;
		box-shadow: var(--shadow-sm);
		opacity: 0;
		transition: opacity 0.2s linear;
    border-radius: 7px;
	}
	.open {
		opacity: 1;
		width: 70vw;
	}

	nav {
		position: fixed;
		bottom: 15px;
		right: 5px;
		display: flex;
		align-items: center;
		justify-content: space-between;
		height: 2rem;
	}

	.grid-container {
		display: grid;
		height: calc(97vh - 2rem - 5rem);
		max-width: 680px;
		margin: auto;
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
