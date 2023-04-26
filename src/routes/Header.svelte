<script lang="ts">
	import bulb from '$lib/images/light-bulb.png';
	import logo from '$lib/images/jt-logo.png';
	import Navbar from '$lib/components/Navbar.svelte';

	const links = [
		{ name: 'Home', href: '/' },
		{ name: 'About', href: '/about' },
		{ name: 'Projects', href: '/projects' }
	];
</script>

<header class="flex items-center justify-between h-20 margin-bellow">
	<img src={logo} alt="logo" class="w-20 py-3" />
	<img src={bulb} alt="light bulb" class="vertical-size" />
	<Navbar {links} />
</header>

<style lang="postcss">
	@media (max-height: 800px), (max-width: 639px) {
		.vertical-size {
			@apply absolute top-0 left-1/2 transform -translate-x-1/2 h-20;
		}

		.margin-bellow {
			@apply mb-6;
		}
	}

	@media (min-height: 801px) and (min-width: 640px) {
		.vertical-size {
			@apply absolute top-0 left-1/2 transform -translate-x-1/2 h-48;
		}

		.margin-bellow {
			@apply mb-20;
		}
	}

	@media (min-height: 1000px) and (min-width: 640px) {
		.vertical-size {
			@apply absolute top-0 left-1/2 transform -translate-x-1/2 h-56;
		}

		.margin-bellow {
			@apply mb-32;
		}
	}
</style>
