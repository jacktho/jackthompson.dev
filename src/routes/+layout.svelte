<script>
	import '../app.css';
	import Header from './Header.svelte';
	import Footer from './Footer.svelte';
	import { dev } from '$app/environment';
	import { inject } from '@vercel/analytics';

	inject({ mode: dev ? 'development' : 'production' });
</script>

<div class="container mx-auto flex flex-col justify-between min-h-screen min-w-[350px]">
	<Header />
	<main class="">
		<slot />
	</main>
	<Footer />
</div>

<style lang="postcss">
	:global(html) {
		background-color: theme(colors.black);
		color: theme(colors.white);
	}
</style>
