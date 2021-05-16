<script lang="ts">
	import CustomButton from '../lib/CustomButton.svelte';
	import LoadingIndicator from '../lib/LoadingIndicator.svelte';
	import LoginOkIndicator from '../lib/LoginOkIndicator.svelte';
	import { setAuthToken } from '../auth';
	import { goto } from '$app/navigation';
	const processlogin = async (tokenOk: boolean): Promise<void> => {
		if (!tokenOk) {
			loading = false;
			loginOk = false;
			return null;
		}
		loginOk = true;
		await goto('/practice');
		loading = false;
	};
	const login = async (): Promise<void> => {
		loading = true;
		const tokenOk = await setAuthToken(email, password);
		processlogin(tokenOk);
	};
	let email: string;
	let password: string;
	let loading = false;
	let loginOk: boolean | undefined;
</script>

<article>
	<h1>Ja eikun puttailemaan!</h1>

	<LoginOkIndicator {loginOk} {loading}/>
	<LoadingIndicator {loading} />

	<form on:submit|preventDefault={login}>
		<p>
			<label for="email-field">Käyttäjätunnus</label>
			<input id="email-field" name="email" type="text" bind:value={email} />
		</p>

		<p>
			<label for="password-field">Salasana</label>
			<input id="password-field" name="password" type="password" bind:value={password} />
		</p>

		<CustomButton>Kirjaudu</CustomButton>
	</form>
</article>

<style>
	label {
		display: block;
	}
	article {
		margin: auto;
		width: 80vw;
	}
	form {
		width: 100%;
	}
	input {
		width: 100%;
	}
</style>
