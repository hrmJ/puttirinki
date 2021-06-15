<script lang="ts" context="module">
	export enum inputType {
		PASSWORD = 'password',
		EMAIL = 'email'
	}
	export type validatorFunction = () => string;
</script>

<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	export let name: string;
	export let value: string;
	export let customType: inputType;
	export let validators: validatorFunction[] = [];
	let validationErrors: string[] = [];
	const dispatch = createEventDispatcher();
	const reportErrors = (errors: string[]) => {
		dispatch('updateValidation', { hasErrors: Boolean(errors.length), name });
	};
	const validate = async () => {
		validationErrors = validators.map((validator) => validator()).filter(Boolean);
		reportErrors(validationErrors);
	};
</script>

<article>
	<label for={name + '-field'}><slot /></label>
	{#if customType === inputType.PASSWORD}
		<input id={name + '-field'} {name} type="password" bind:value on:blur={validate} />
	{:else if customType === inputType.EMAIL}
		<input id={name + '-field'} {name} type="email" bind:value on:blur={validate} />
	{:else}
		<input
			id={name + '-field'}
			{name}
			type="text"
			bind:value
			autocomplete="off"
			on:blur={validate}
		/>
	{/if}
	<ul>
		{#each validationErrors as err}
			<li class="validation-errors">{err}</li>
		{/each}
	</ul>
</article>

<style>
	label {
		display: block;
	}
	input {
		margin-top: var(--margin-sm);
	}
	ul {
		margin: 0;
    margin-top: var(--margin-md);
	}
	li + li {
		margin-top: var(--margin-sm);
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
		font-size: var(--font-sm-0);
	}

	/*input:focus {*/
	/*border-color: hsl(var(--input-focus-h), var(--input-focus-s), var(--input-focus-l));*/
	/*}*/

	input:focus {
		box-shadow: 0 0 0 3px lightgrey;
	}
</style>
