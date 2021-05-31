<script lang="ts">
	export let isPrimary: boolean;
	export let val: number;
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();
</script>

<button
	class={isPrimary ? 'primary' : ''}
	on:click={() => {
		dispatch('hit');
	}}
>
	{val}
</button>

<style>
	button {
		border: 0;
		border-radius: 50%;
		background: hsl(0, 0%, 70%);
		color: white;
		font-family: -system-ui, sans-serif;
		text-decoration: none;
		padding: 1.7rem 1.7rem;
		cursor: pointer;
		font-size: 0.7em;
		text-transform: uppercase;
		box-shadow: 0 4px 6px hsla(0, 0%, 0%, 0.2);
	}
	.primary {
		padding: 2.2rem 2.2rem;
		background: hsl(0, 0%, 50%);
		font-weight: 600;
		font-size: 1.4em;
	}
</style>
