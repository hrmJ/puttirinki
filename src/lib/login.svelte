<script lang="ts">
	import CustomButton from '../lib/CustomButton.svelte';
	import LoadingIndicator from '../lib/LoadingIndicator.svelte';
	import LoginOkIndicator from '../lib/LoginOkIndicator.svelte';
	import { setAuthToken, authStore, setUser, submitSignUp } from '../auth';
	import TextInput, { inputType } from './textInput.svelte';
	import type { signupData } from '../types';
	import { requestState } from '../apiCalls';

	let loading = false;
	let loginOk: boolean | undefined;
	let signUp = false;
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

	const processlogin = async (tokenOk: boolean): Promise<void> => {
		if (!tokenOk) {
			loading = false;
			loginOk = false;
			return null;
		}
		loginOk = true;
		loading = false;
		authStore.update(setUser);
	};

	const login = async (): Promise<void> => {
		loading = true;
		const { username, password } = signupData;
		const tokenOk = await setAuthToken(username, password);
		processlogin(tokenOk);
	};

	const initiateSignup = async () => {
		loading = true;
		const resp = await submitSignUp(validate(), signupData);
		loading = false;
		if (resp == requestState.COMPLETE) {
			await login();
		}
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

	<LoginOkIndicator {loginOk} {loading} />
	<!-- <SignUpOkIndicator {loginOk} {loading} /> -->
	<LoadingIndicator show={loading} />

	<form on:submit|preventDefault={() => (signUp ? initiateSignup() : login())}>
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
