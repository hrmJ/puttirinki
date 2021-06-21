<script lang="ts">
	import CustomButton from '../lib/CustomButton.svelte';
	import TextInput, { inputType } from './textInput.svelte';
	import type { signupData } from '../types';
	import ResponseStatus from './ResponseStatus.svelte';
	import { initiateLogin, initiateSignup } from '../login';
	import loginForm from '../loginFormStore';

	let signUp = false;
	let errorMessage = '';
	const validationErrors = {};
	const signupData: signupData = {
		password: '',
		passwordConfirmation: '',
		username: '',
		email: ''
	};
	const validators = {
		passwordConfirmation: () =>
			signupData.password &&
			signupData.passwordConfirmation &&
			signupData.password !== signupData.passwordConfirmation
				? 'Salasanat eivät täsmää'
				: '',
		notEmpty: (val: string) => (!val ? 'Muista täyttää tämäkin!' : ''),
		email: (val: string) =>
			val.match(/[a-öA-Ö.-_]+@[a-öA-Ö.]+\.[a-z]+/) === null
				? 'Kirjoita oikea sähköpostiosoite. Sitä käytetään vain tarvittaessa unohtuneen salasanan vaihtamiseksi'
				: ''
	};

	const setValidationState = ({ hasErrors, name }) => {
		validationErrors[name] = hasErrors;
	};

	const validate = (): boolean => {
		const hasErrors = Object.values(validationErrors).some(Boolean);
		return !hasErrors;
	};
</script>

<article>
	{#if !signUp}
		<h1>Putit mielessä?</h1>
	{:else}
		<h1>Pari detaljia vain...</h1>
	{/if}

	<ResponseStatus errorMessage={$loginForm.errorMessage} />

	{#if $loginForm.isLoading}
		<p>LATAAA</p>
	{/if}

	<form
		on:submit|preventDefault={() =>
			signUp ? initiateSignup(validate, signupData) : initiateLogin(signupData)}
	>
		<TextInput name="username" bind:value={signupData.username} validators={[validators.notEmpty]}
			>Käyttäjätunnus</TextInput
		>
		<TextInput
			name="password"
			customType={inputType.PASSWORD}
			bind:value={signupData.password}
			validators={[validators.notEmpty]}
			on:updateValidation={(event) => setValidationState(event.detail)}>Salasana</TextInput
		>

		{#if signUp}
			<TextInput
				name="passwordConfirmation"
				customType={inputType.PASSWORD}
				validators={[validators.passwordConfirmation, validators.notEmpty]}
				on:updateValidation={(event) => setValidationState(event.detail)}
				bind:value={signupData.passwordConfirmation}>Salasana uudelleen</TextInput
			>
			<TextInput
				name="email"
				customType={inputType.EMAIL}
				bind:value={signupData.email}
				validators={[validators.notEmpty, validators.email]}
				>Sähköposti unohtuneen salasanan resetoimiseksi</TextInput
			>
		{/if}

		<div class="actions">
			{#if !signUp}
				<CustomButton customClass="cta" on:click={() => (signUp = true)}>Luo tunnus</CustomButton>
				tai
				<CustomButton customType="submit">Kirjaudu</CustomButton>
			{:else}
				<CustomButton customClass="cta" customType="submit">Liity mukaan!</CustomButton>
				<CustomButton on:click={() => (signUp = false)}>Hups</CustomButton>
			{/if}
		</div>
	</form>
</article>

<style>
	:global(article + article) {
		margin-top: 1em;
	}

	article {
		margin: auto;
		width: 80vw;
	}
	form {
		width: 100%;
	}
	.actions {
		margin-top: 1.5em;
	}
</style>
