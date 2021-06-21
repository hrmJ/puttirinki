<script lang="ts">
	export let errorMessage: string;
</script>

{#if errorMessage}
	<p>{errorMessage}</p>
{/if}
