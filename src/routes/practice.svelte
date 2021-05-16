<script lang="ts">
	import HitButton from '../lib/HitButton.svelte';
	import { hitStore } from '../hitStore';
	let total = 0;
	hitStore.subscribe((score) => {
		total = Object.values(score).reduce((prev, cur) => prev + cur, 0);
	});
</script>

<div>
	{$hitStore.hit} / {total}
</div>

<div class="grid-container">
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
</div>

<style type="text/css" media="screen">
	.grid-container {
		display: grid;
		height: 95vh;
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
