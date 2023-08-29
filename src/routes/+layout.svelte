<script lang="ts">
	import '../app.postcss';
	import { AppShell, AppBar } from '@skeletonlabs/skeleton';
	import { LightSwitch } from '@skeletonlabs/skeleton';
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
	import { storePopup } from '@skeletonlabs/skeleton';
	import auth from '$lib/auth0service';
	import { auth0Client, isAuthenticated, user } from '../stores/auth0store';
	import { onMount } from 'svelte';
	import type { Auth0Client } from '@auth0/auth0-spa-js/dist/typings/Auth0Client';

	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });

	onMount(async () => {
		if (!$auth0Client) {
			let client = await auth.createClient();
			auth0Client.set(client);
			isAuthenticated.set(await client.isAuthenticated());
			user.set(await client.getUser());
		}
	});

	function login() {
		auth.loginWithPopup($auth0Client as Auth0Client, {});
	}
</script>

<!-- App Shell -->
<AppShell>
	<svelte:fragment slot="header">
		<!-- App Bar -->
		<AppBar class="variant-outlined-primary">
			<svelte:fragment slot="lead">
				<strong class="text-xl uppercase">Fluid</strong>
			</svelte:fragment>

			<svelte:fragment slot="trail">
				<!-- Light Switch -->
				<LightSwitch />

				<!-- Login Button -->
				{#if $isAuthenticated == false}
					<button class="btn variant-filled-primary" on:click={login}> Login </button>
				{/if}

				<!-- Logout Button -->
				{#if $isAuthenticated == true}
					<button class="btn variant-filled-primary"> Logout </button>
				{/if}
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>

	<svelte:fragment slot="footer">
		<!-- Footer -->
		<footer class="text-center py-2 variant-soft-primary">
			<!-- Copyright with year -->
			<small>&copy; Fluid Communications {new Date().getFullYear()}</small>
		</footer>
	</svelte:fragment>
	<slot />
</AppShell>
