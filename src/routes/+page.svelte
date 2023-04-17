<script lang="ts">
	import type { ActionData } from './$types';
	import type { Message } from '$lib/types';
	import Typewriter from 'svelte-typewriter';
	import character from '$lib/images/character.png';

	import Reply from './Reply.svelte';

	export let form: ActionData;

	let history: Message[] = [];
	$: history = (form?.history as Message[]) || [];

	let messageToShow: string =
		form?.answer ||
		`Hello, my name is Jack! It's a pleasure to meet you. May I have the honor of knowing your name?`;
</script>

<div class="flex flex-col p-3 justify-center items-center radial-gradient">
	<div class="flex gap-x-6 w-full max-w-2xl items-center">
		<img src={character} alt="character" class="h-16 md:h-32" />
		<p class="md:text-lg lg:text-xl text-amber-500 grow">
			<Typewriter --cursor-color="rgb(245, 158, 11)" keepCursorOnFinish={true}>
				{messageToShow}
			</Typewriter>
		</p>
	</div>

	<Reply {history} on:submit={() => (messageToShow = '')} />
</div>

<style lang="postcss">
	:global(html) {
		background-color: theme(colors.black);
	}

	.radial-gradient {
		background: radial-gradient(
			50% 55% at 50% 50%,
			rgba(162, 58, 0, 0.3) 0%,
			rgba(255, 101, 15, 0) 100%
		);
	}

	.text-container {
		position: relative;
		max-height: calc(100vh - 400px);
		overflow-y: auto;
		padding: 0 1rem;
	}

	@media (max-height: 500px) {
		.text-container {
			max-height: 110px;
		}
	}
</style>
