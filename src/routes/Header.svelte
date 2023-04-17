<script lang="ts">
	import bulb from '$lib/images/light-bulb.png';
	import logo from '$lib/images/jt-logo.png';
	import Menu from '$lib/images/Menu.svelte';
</script>

<header class="flex items-center justify-between h-20">
	<img src={logo} alt="logo" class="w-20 py-3" />
	<img src={bulb} alt="light bulb" class="vertical-size" />
	<Menu />
</header>

<style lang="postcss">
	@media (max-height: 800px), (max-width: 349px) {
		.vertical-size {
			@apply h-full;
		}
	}

	@media (min-height: 801px) and (min-width: 350px) {
		.vertical-size {
			@apply absolute top-0 left-1/2 transform -translate-x-1/2 h-48;
		}
	}

	@media (min-height: 1000px) and (min-width: 350px) {
		.vertical-size {
			@apply h-64;
		}
	}
</style>
