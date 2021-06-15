<script lang="ts">
	export let customClass: string;
	export let customType: string;
</script>

<button on:click class={customClass} type={customType || 'button'}><slot /></button>

<style>
	button {
		border: 0;
		border-radius: 0.25rem;
		background: hsl(0, 0%, 80%);
		font-family: -system-ui, sans-serif;
		font-size: var(--font-sm-2);
		padding: var(--padding-md);
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
	button.cta {
		border: 0;
		font-family: -system-ui, sans-serif;
		font-size: var(--font-sm-2);
		padding: var(--padding-md);
		line-height: 1.2;
		white-space: nowrap;
		text-decoration: none;
		margin: 0;
		cursor: pointer;
	}

	.chunky {
		border-radius: 2px;
		padding: 1em;
		font-size: 0.8rem;
	}
</style>
