<script lang="ts">
	export let noOutline = false;
</script>

<button on:click class={noOutline ? 'no-outline' : ''}><slot /></button>

<style>
	button {
		border: 0;
		border-radius: 0.25rem;
		background: hsl(0, 0%, 80%);
		font-family: -system-ui, sans-serif;
		font-size: 1rem;
		line-height: 1.2;
		white-space: nowrap;
		text-decoration: none;
		padding: 0.25rem 0.5rem;
		margin: 0.25rem;
		cursor: pointer;
	}
	button.no-outline {
		border: 0;
		border-radius: 0;
		background: transparent;
		font-family: -system-ui, sans-serif;
		font-size: 1rem;
		line-height: 1.2;
		white-space: nowrap;
		text-decoration: none;
		padding: 0;
		margin: 0;
		cursor: pointer;
	}
</style>
