<script lang="ts">
	import { enhance } from '$app/forms';
	import type { Message } from '$lib/types';

	export let history: Message[] = [];
	export let isTyping = false;

	let form: HTMLFormElement;

	const handleKeyDown = (event: KeyboardEvent) => {
		if (event.key === 'Enter' && event.ctrlKey) {
			event.preventDefault();
			form.dispatchEvent(new Event('submit'));
		}
	};
</script>

<form
	bind:this={form}
	use:enhance={({ cancel }) => {
		if (isTyping) {
			cancel();
		} else {
			isTyping = true;
		}

		return async ({ update }) => {
			await update();
		};
	}}
	on:submit
	class="w-full max-w-2xl flex gap-y-3 md:gap-y-6 flex-col text-center bg-amber-800/25 mt-4 p-3 md:p-6 rounded-lg shadow-lg shadow-black/75 border-t border-amber-900"
	method="POST"
>
	<div>
		<label for="message" class="sr-only">Reply</label>
		<div>
			<textarea
				on:keydown={handleKeyDown}
				rows="4"
				name="message"
				id="message"
				placeholder="Reply to the bot"
				class="bg-black block w-full rounded-md border-0 bg-black/20 text-amber-500 placeholder:text-orange-900 focus:ring-0 shadow-inner shadow-black/25 border-b focus:shadow-black/50 border-amber-900 focus:border-amber-900 p-2 sm:p-4 sm:text-lg sm:leading-6"
			/>
			<input type="hidden" name="history" value={JSON.stringify(history)} />
		</div>
	</div>
	<button
		type="submit"
		disabled={isTyping}
		class="disabled:invisible place-self-end rounded-md bg-black/10 px-5 py-3 md:text-xl text-sm border-t active:border-t-0 active:border-b active:border-amber-900 border-amber-900 text-amber-600 shadow-sm hover:shadow shadow-black/75 hover:shadow-black/75 active:shadow-inner active:shadow-black-75"
		>Reply</button
	>
</form>
