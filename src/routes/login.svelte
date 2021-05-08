<script lang="ts">
	import CustomButton from '../lib/CustomButton.svelte';
</script>

<article>
	<h1>Ja eikun puttailemaan!</h1>

	<form on:submit|preventDefault={() => null}>
		<p>
			<label for="email-field">Käyttäjätunnus</label>
			<input id="email-field" name="email" type="email" />
		</p>

		<p>
			<label for="password-field">Salasana</label>
			<input id="password-field" name="password" type="password" />
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
