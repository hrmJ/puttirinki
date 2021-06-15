<script lang="ts" context="module">
	export enum inputType {
		PASSWORD = 'password',
		EMAIL = 'email'
	}
</script>

<script lang="ts">
	export let name: string;
	export let validationErrors: string[];
	export let value: string;
	export let customType: inputType;
</script>

<article>
	<label for={name + '-field'}><slot /></label>
	{#if customType === inputType.PASSWORD}
		<input id={name + '-field'} {name} type="password" bind:value />
	{:else if customType === inputType.EMAIL}
		<input id={name + '-field'} {name} type="email" bind:value />
	{:else}
		<input id={name + '-field'} {name} type="text" bind:value autocomplete="off" />
	{/if}
	<p class="validation-errors">{validationErrors ? validationErrors.join(',') : ''}</p>
</article>

<style>
	label {
		display: block;
	}
	input {
		width: 100%;
		max-width: 600px;
		font-size: 16px;
		font-size: max(16px, 1em);
		font-family: inherit;
		padding: 0.25em 0.5em;
		background-color: #fff;
		border: 1px solid var(--input-border);
		border-radius: var(--border-radius-2);
		line-height: 1;
		height: 2.25rem;
		transition: 180ms box-shadow ease-in-out;
		outline: 3px solid transparent;
	}
	.validation-errors {
		font-size: var(--font-sm-1);
	}

	/*input:focus {*/
	/*border-color: hsl(var(--input-focus-h), var(--input-focus-s), var(--input-focus-l));*/
	/*}*/

	input:focus {
		box-shadow: 0 0 0 3px lightgrey;
	}
</style>
