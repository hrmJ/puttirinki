<script lang="ts">
	import { UserSolidCircleIcon, RadarIcon, MenuIcon } from 'svelte-zondicons';
	import CustomButton from '../lib/CustomButton.svelte';
	let showNav = false;
	const toggleNav = () => {
		showNav = !showNav;
	};
</script>

<div class="menu-launcher">
	<CustomButton noOutline on:click={toggleNav}><MenuIcon color="white" /></CustomButton>
</div>
<header />

{#if showNav}
	<nav>
		<ul>
			<li>
				<UserSolidCircleIcon color="white" />
				<a href="dashboard">Tilastot</a>
			</li>
			<li>
				<RadarIcon color="white" />
				<a href="practice">Treeni</a>
			</li>
		</ul>
	</nav>
{/if}

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
		padding: 0;
		height: 3rem;
		overflow: hidden;
	}
	nav {
		background: hsl(2, 0%, 70%);
		position: fixed;
		top: 0rem;
		width: 70vw;
		max-width: 300px;
		height: 100vh;
		left: 0;
		padding: 3.5rem 0em 0em 1em;
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
