<script lang="ts" context="module">
	type signupData = {
		password: string;
		passwordConfirmation: string;
		username: string;
		email: string;
	};
</script>

<script lang="ts">
	import CustomButton from '../lib/CustomButton.svelte';
	import LoadingIndicator from '../lib/LoadingIndicator.svelte';
	import LoginOkIndicator from '../lib/LoginOkIndicator.svelte';
	import { setAuthToken, authStore, setUser, submitSignUp } from '../auth';
	import TextInput, { inputType } from './textInput.svelte';
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

	const validateSignup = async (data: signupData) => {
		validationErros = Object.entries(data).reduce(
			(allErrors, [field, val]) => ({
				...allErrors,
				[field]:
					field in validators ? validators[field].map((thisValidator) => thisValidator()) : null
			}),
			{ passwordConfirmation: [] }
		);
		const hasErrors = Object.values(validationErros).some(
			(val: [] | null) => val && val.some(Boolean)
		);
		console.log(hasErrors, validationErros);
	};

	const signupData: signupData = {
		password: '',
		passwordConfirmation: '',
		username: '',
		email: ''
	};

	let validators = {
		passwordConfirmation: [
			() => {
				return signupData.password !== signupData.passwordConfirmation
					? 'Salasanat eivät täsmää'
					: '';
			}
		]
	};
	let validationErros = { passwordConfirmation: [] };
	let loading = false;
	let loginOk: boolean | undefined;
	let signUp = false;
</script>

<article>
	<h1>Ja eikun puttailemaan!</h1>

	<LoginOkIndicator {loginOk} {loading} />
	<LoadingIndicator show={loading} />

	<form on:submit|preventDefault={() => (signUp ? validateSignup(signupData) : login())}>
		<TextInput name="username" bind:value={signupData.username}>Käyttäjätunnus</TextInput>
		<TextInput name="password" customType={inputType.PASSWORD} bind:value={signupData.password}
			>Salasana</TextInput
		>

		{#if signUp}
			<TextInput
				name="passwordConfirmation"
				customType={inputType.PASSWORD}
				validationErrors={validationErros.passwordConfirmation}
				bind:value={signupData.passwordConfirmation}>Salasana uudelleen</TextInput
			>
			<TextInput name="email" customType={inputType.EMAIL} bind:value={signupData.email}
				>Sähköposti unohtuneen salasanan resetoimiseksi</TextInput
			>
		{/if}

		<CustomButton
			customClass="cta"
			customType={signUp ? 'submit' : 'button'}
			on:click|once={() => (signUp = true)}>Luo tunnus</CustomButton
		>
		tai
		<CustomButton customType="submit">Kirjaudu</CustomButton>
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
</style>
