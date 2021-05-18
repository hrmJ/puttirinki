<script lang="ts">
	import { requestState } from '../apiCalls';
	export let state: requestState;
	export let message: string;
</script>


{#if state === requestState.STARTED}
	<p>Odota hetki...</p>
{/if}
{#if state === requestState.COMPLETE}
	<p>{message || 'Tiedot tallennettu'}</p>
{/if}
