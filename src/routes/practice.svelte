<script lang="ts">
	import HitButton from '../lib/HitButton.svelte';
</script>

<div class="grid-container">
	<div class="button-container topmiddle">
		<HitButton heading="Ohi" />
	</div>
	<div class="button-container centermiddle"><HitButton heading="Osu" isPrimary /></div>
	<div class="button-container bottommiddle"><HitButton heading="Ohi" /></div>
	<div class="button-container rightmiddle"><HitButton heading="Ohi" /></div>
	<div class="button-container leftmiddle"><HitButton heading="Ohi" /></div>
</div>

<style type="text/css" media="screen">
	.grid-container {
		display: grid;
		height: 95vh;
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
