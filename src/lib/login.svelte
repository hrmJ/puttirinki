<script lang="ts">
	import CustomButton from '../lib/CustomButton.svelte';
	import LoadingIndicator from '../lib/LoadingIndicator.svelte';
	import LoginOkIndicator from '../lib/LoginOkIndicator.svelte';
	import { setAuthToken, authStore, setUser, submitSignUp } from '../auth';
	import TextInput, { inputType } from './textInput.svelte';
	import type { signupData } from '../types';
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

	const validationErrors = {};

	const setValidationState = ({ hasErrors, name }) => {
		validationErrors[name] = hasErrors;
	};

	const signupData: signupData = {
		password: '',
		passwordConfirmation: '',
		username: '',
		email: ''
	};

	let validators = {
		passwordConfirmation: [
			() =>
				signupData.password &&
				signupData.passwordConfirmation &&
				signupData.password !== signupData.passwordConfirmation
					? 'Salasanat eivät täsmää'
					: ''
		]
	};
	let loading = false;
	let loginOk: boolean | undefined;
	let signUp = false;
</script>

<article>
	<h1>Ja eikun puttailemaan!</h1>

	<LoginOkIndicator {loginOk} {loading} />
	<LoadingIndicator show={loading} />

	<form on:submit|preventDefault={() => (signUp ? submitSignUp(signupData) : login())}>
		<TextInput name="username" bind:value={signupData.username}>Käyttäjätunnus</TextInput>
		<TextInput
			name="password"
			customType={inputType.PASSWORD}
			bind:value={signupData.password}
			validators={validators.passwordConfirmation}
			on:updateValidation={(event) => setValidationState(event.detail)}>Salasana</TextInput
		>

		{#if signUp}
			<TextInput
				name="passwordConfirmation"
				customType={inputType.PASSWORD}
				validators={validators.passwordConfirmation}
				on:updateValidation={(event) => setValidationState(event.detail)}
				bind:value={signupData.passwordConfirmation}>Salasana uudelleen</TextInput
			>
			<TextInput name="email" customType={inputType.EMAIL} bind:value={signupData.email}
				>Sähköposti unohtuneen salasanan resetoimiseksi</TextInput
			>
		{/if}

		<div class="actions">
			<CustomButton
				customClass="cta"
				customType={signUp ? 'submit' : 'button'}
				on:click|once={() => (signUp = true)}>Luo tunnus</CustomButton
			>
			tai
			<CustomButton customType="submit">Kirjaudu</CustomButton>
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
