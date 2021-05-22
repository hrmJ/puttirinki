<script lang="ts">
	import { statsStore } from '../statStore';
	import { requestState } from '../apiCalls';
</script>

{#await $statsStore}
	<p>Ladataan tilastoja...</p>
{:then stats}
	{#if stats.state === requestState.COMPLETE}
		<p>
			Morjes, Nunnunuuu, olet heittänyt yhteensä {stats.data.sessionCount} settiä, ja kaikkiaan heittoja
			on tullut {stats.data.total}!
		</p>

		<ul>
			<li>Osumaprosenttisi on {((stats.data.hit / stats.data.total) * 100).toFixed(2)} %</li>
			<li>Vasemmalta on mennyt ohi {((stats.data.left / stats.data.total) * 100).toFixed(2)} %</li>
			<li>Oikealta on mennyt ohi {((stats.data.right / stats.data.total) * 100).toFixed(2)} %</li>
			<li>Yli on suhahtanut {((stats.data.top / stats.data.total) * 100).toFixed(2)} %</li>
			<li>Alas on lipsahtanut {((stats.data.bottom / stats.data.total) * 100).toFixed(2)} %</li>
		</ul>
	{:else}
		<p>Lataus ei onnistunut: {stats.error}</p>
	{/if}
{/await}
