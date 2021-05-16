<script lang="ts">
	import CustomButton from '../lib/CustomButton.svelte';
  import { setAuthToken } from '../auth';
	const login = async (): Promise<void> => {
		const tokenOk = await setAuthToken(email, password);
	};
	let email: string;
	let password: string;
</script>

<article>
	<h1>Ja eikun puttailemaan!</h1>

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
