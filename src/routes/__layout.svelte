<script lang="ts">
	import { UserSolidCircleIcon, RadarIcon, MenuIcon } from 'svelte-zondicons';
	import CustomButton from '../lib/CustomButton.svelte';
	import { hitStore } from '../hitStore';
	let total = 0;
	hitStore.subscribe((score) => {
		total = Object.values(score).reduce((prev, cur) => prev + cur, 0);
	});
	let showNav = false;
	const toggleNav = () => {
		showNav = !showNav;
	};
</script>

<div class="menu-launcher">
	<CustomButton customClass="no-outline" on:click={toggleNav}
		><MenuIcon color="white" /></CustomButton
	>
</div>
<header>
	{$hitStore.hit} / {total}
</header>
<nav class={showNav ? 'open' : ''}>
	<ul>
		<li>
			<UserSolidCircleIcon color="white" />
			<a href="dashboard" on:click={toggleNav}>Tilastot</a>
		</li>
		<li>
			<RadarIcon color="white" />
			<a href="practice" on:click={toggleNav}>Treeni</a>
		</li>
	</ul>
</nav>

<slot />

<style>
	.menu-launcher {
		position: absolute;
		top: 0.5rem;
		left: 1em;
		z-index: 99;
	}
	header {
		width: 100vw;
		margin: 0em;
		background: hsl(0, 0%, 40%);
		padding: 0 0 0 2em;
		height: 3rem;
		overflow: hidden;
		color: white;
    display: flex;
    align-items: center;
	}
	nav {
		background: hsl(2, 0%, 70%);
		opacity: 0;
		width: 0;
		position: fixed;
		top: 0rem;
		max-width: 300px;
		height: 100vh;
		left: 0;
		padding: 3.5rem 0em 0em 1em;
		transition: width 0.2s linear;
	}
	.open {
		opacity: 1;
		width: 70vw;
	}

	ul {
		display: flex;
		align-items: flex-start;
		flex-flow: column nowrap;
		list-style-type: none;
		margin-left: 0;
		margin-top: 0;
		padding-left: 0;
	}
	li > a {
		margin-left: 0.6em;
	}
	li {
		display: flex;
		align-items: center;
		justify-content: center;
	}
	li + li {
		margin-top: 2em;
	}
	a,
	a:active,
	a:visited {
		color: white;
	}
</style>
