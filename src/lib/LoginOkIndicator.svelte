<script lang="ts">
	export let loginOk: boolean;
	export let loading: boolean;
</script>

{#if loginOk === false && !loading}
	<p>Kirjautuminen epäonnistui, yritä uudelleen.</p>
{/if}
