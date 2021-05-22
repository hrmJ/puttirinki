<script lang="ts">
	import { stats } from '../statStore';
</script>

{#if $stats}
	<p>
		Morjes, Nunnunuuu, olet heittänyt yhteensä {$stats.sessionCount} settiä, ja kaikkiaan heittoja on
		tullut {$stats.total}!
	</p>

	<ul>
		<li>Osumaprosenttisi on {(($stats.hit / $stats.total) * 100).toFixed(2)} %</li>
		<li>Vasemmalta on mennyt ohi {(($stats.left / $stats.total) * 100).toFixed(2)} %</li>
		<li>Oikealta on mennyt ohi {(($stats.right / $stats.total) * 100).toFixed(2)} %</li>
		<li>Yli on suhahtanut {(($stats.top / $stats.total) * 100).toFixed(2)} %</li>
		<li>Alas on lipsahtanut {(($stats.bottom / $stats.total) * 100).toFixed(2)} %</li>
	</ul>
{:else}
	<p>Ladataan tilastoja...</p>
{/if}
