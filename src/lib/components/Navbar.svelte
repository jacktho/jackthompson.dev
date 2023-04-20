<script lang="ts">
	import { fade } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
	import Menu from '$lib/images/Menu.svelte';
	import logo from '$lib/images/jt-logo.png';

	export let links: { name: string; href: string }[];

	let mobileMenuOpen = false;

	function toggleMenu() {
		mobileMenuOpen = !mobileMenuOpen;
	}
</script>

<nav class="text-amber-700">
	<div class="hidden md:flex gap-4">
		{#each links as item}
			<a
				href={item.href}
				class="block rounded-lg px-3 py-2 text-base font-semibold leading-7 hover:bg-amber-950"
			>
				{item.name}
			</a>
		{/each}
	</div>

	{#if mobileMenuOpen}
		<!-- Mobile menu, show/hide based on menu open state. -->
		<div
			transition:fade={{ duration: 1000, delay: 200, easing: quintOut }}
			class="md:hidden"
			role="dialog"
			aria-modal="true"
		>
			<!-- Background backdrop, show/hide based on slide-over state. -->
			<div class="fixed inset-0 z-10" />
			<div
				class="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-black px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-white/10"
			>
				<div class="flex items-center justify-between">
					<a href="/" on:click={() => toggleMenu()} class="-m-1.5 p-1.5">
						<span class="sr-only">Jack Thompson Logo</span>
						<img class="w-8 w-auto" src={logo} alt="Jack Thompson's logo" />
					</a>
					<button type="button" class="-m-2.5 rounded-md p-2.5" on:click={() => toggleMenu()}>
						<span class="sr-only">Close menu</span>
						<svg
							class="h-6 w-6"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="1.5"
							stroke="currentColor"
							aria-hidden="true"
						>
							<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
						</svg>
					</button>
				</div>
				<div class="mt-6 flow-root">
					<div class="-my-6 divide-y divide-gray-500/25">
						<div class="space-y-2 py-6">
							{#each links as item}
								<a
									href={item.href}
									on:click={() => toggleMenu()}
									class="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 hover:bg-amber-950"
								>
									{item.name}
								</a>
							{/each}
						</div>
					</div>
				</div>
			</div>
		</div>
	{:else}
		<div class="flex md:hidden">
			<button type="button" class="" on:click={toggleMenu}>
				<span class="sr-only">Open nav menu</span>
				<Menu />
			</button>
		</div>
	{/if}
</nav>
