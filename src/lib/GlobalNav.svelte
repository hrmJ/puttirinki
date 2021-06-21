<script lang="ts">
	import { authStore } from '../auth';

	import type { User } from 'src/types';

	import { UserSolidCircleIcon, RadarIcon, StandByIcon } from 'svelte-zondicons';
	import CustomButton from './CustomButton.svelte';
	export let toggleNav: () => void;
	export let showNav: boolean;
	export let user: Pick<User, '_id' | 'name'> | null;
	function logout() {
		toggleNav();
		localStorage.removeItem('accessToken');
		localStorage.removeItem('userID');
		authStore.set(null);
	}
</script>

{#if user}
	<nav class={showNav ? 'open' : ''}>
		<p class="user-details">Tervetuloa, {user.name}!</p>
		<ul>
			<li>
				<UserSolidCircleIcon color="white" />
				<a href="/dashboard" on:click={toggleNav}>Tilastot</a>
			</li>
			<li>
				<RadarIcon color="white" />
				<a href="/" on:click={toggleNav}>Treeni</a>
			</li>
			<li class="buttonContainer">
				<StandByIcon color="white" />
				<CustomButton customClass="no-outline" on:click={logout}>Kirjaudu ulos</CustomButton>
			</li>
		</ul>
	</nav>
{/if}

<style>
	.user-details {
		margin-bottom: 2rem;
		margin-top: 0.3rem;
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
		padding: 3.3rem 0em 0em 1em;
		transition: opacity 0.2s linear;
		z-index: 2;
		color: white;
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
	.buttonContainer :global(button) {
		color: white;
		margin-left: 0.6em;
		text-decoration: underline;
	}
</style>
