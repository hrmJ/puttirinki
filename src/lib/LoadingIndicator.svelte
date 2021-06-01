<script lang="ts">
	import { requestState } from '../apiCalls';
	export let state: requestState;
	export let message: string;
	export let show: boolean;
</script>

{#if state === requestState.STARTED || show === true}
	<p>Odota hetki...</p>
{/if}
{#if state === requestState.COMPLETE}
	<p>{message || 'Tiedot tallennettu'}</p>
{/if}
