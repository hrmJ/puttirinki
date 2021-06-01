<script lang="ts">
	import { MenuIcon } from 'svelte-zondicons';
	import CustomButton from '../lib/CustomButton.svelte';
	import { hitStore } from '../hitStore';
	import { authStore } from '../auth';
	import type { User } from 'src/types';
	import GlobalNav from '$lib/GlobalNav.svelte';
	import Login from '$lib/login.svelte';
	import LoadingIndicator from '$lib/LoadingIndicator.svelte';
	import { debug } from 'svelte/internal';
	let total = 0;
	let user: Pick<User, '_id' | 'name'> | null;
	hitStore.subscribe((score) => {
		total = Object.entries(score)
			.filter(([key, val]) => key !== 'showStats')
			.reduce((prev, cur) => prev + (cur[1] as number), 0);
	});
	authStore.subscribe(async (userPromise) => {
		user = await userPromise;
	});
	let showNav = false;
	const toggleNav = () => {
		showNav = !showNav;
	};
</script>

<div class={'menu-launcher ' + (user  == null ? 'hide' : '')}>
	<CustomButton customClass="no-outline" on:click={toggleNav}
		><MenuIcon color="white" /></CustomButton
	>
</div>
<header>
	{#if $hitStore.showStats && user !== null}
		<p>{$hitStore.hit} / {total}</p>
	{/if}
	<GlobalNav {toggleNav} {showNav} {user} />
</header>
{#if user === undefined}
	<LoadingIndicator show />
{:else if user === null}
	<Login />
{:else}
	<slot />
{/if}

<style>
	div.menu-launcher.hide {
		display: none;
	}
	.menu-launcher {
		position: absolute;
		display: flex;
		align-items: center;
		justify-content: center;
		top: 0;
		left: 0.5em;
		z-index: 99;
		height: 3rem;
	}
	header {
		width: 100vw;
		margin: 0em;
		background: hsl(0, 0%, 40%);
		padding: 0 0 0 3rem;
		height: 3rem;
		overflow: hidden;
		color: white;
		display: flex;
		align-items: center;
	}
</style>
