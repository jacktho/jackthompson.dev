<script lang="ts">
	import type { ActionData } from './$types';
	import type { Message } from '$lib/types';
	import { enhance } from '$app/forms';

	export let form: ActionData;

	let history: Message[] = [];
	$: history = (form?.history as Message[]) || [];
</script>

<div>
	<head>
		<title>OpenAI Quickstart</title>
	</head>

	<main class="container mx-auto">
		<h3 class="text-center text-xl font-bold mb-4">
			{form?.answer || 'Hi, what is your name?'}
		</h3>
		<form
			class="text-center"
			method="POST"
			use:enhance={({ data }) => {
				data.append('history', JSON.stringify(history));
			}}
		>
			<input
				type="text"
				name="message"
				placeholder="Enter a prompt"
				class="border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:border-blue-500"
			/>
			<input
				type="submit"
				value="Submit"
				class="bg-blue-500 text-white px-4 py-2 rounded-md mt-4 hover:bg-blue-600 cursor-pointer"
			/>
		</form>
	</main>
</div>
