import { fail } from '@sveltejs/kit';
import type { Actions } from './$types';
import type { Message } from '$lib/types';
import { Configuration, OpenAIApi } from 'openai';
import { OPENAI_API_KEY, DISCORD_BOT_KEY } from '$env/static/private';
import { Client, GatewayIntentBits } from 'discord.js';

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages] });
client.login(DISCORD_BOT_KEY);

const configuration = new Configuration({
	apiKey: OPENAI_API_KEY
});
const openai = new OpenAIApi(configuration);

const system = `You are my AI avatar on my website, answer questions as if you were me. I'm Jack Thompson, a front end developer with 16 years' experience. I handle freelance, contract, or full-time work. Preferred stack: Svelte, SvelteKit, TailwindCSS, TypeScript, Supabase. Email: jack@jackthompson.dev`;

async function queryAPI(messages: Message[]) {
	const completion = await openai.createChatCompletion({
		model: 'gpt-3.5-turbo',
		messages
	});

	return completion;
}

export const actions = {
	default: async ({ request }) => {
		const formData = await request.formData();
		const userMessage = String(formData.get('message'));

		const formDataHistory = formData.get('history');
		const userHistory = JSON.parse(String(formDataHistory));

		if (!userMessage) {
			return fail(400, { message: userMessage, missing: true });
		}

		if (!configuration.apiKey) {
			return {
				status: 500,
				body: {
					error: 'OpenAI API key not configured, please follow instructions in README.md'
				}
			};
		}

		const messages: Message[] = userHistory.length
			? [...userHistory, { role: 'user', content: userMessage }]
			: [
					{ role: 'system', content: system },
					{ role: 'assistant', content: 'Hi, what is your name?' },
					{ role: 'user', content: userMessage }
			  ];

		try {
			const apiResponse = await queryAPI(messages);
			const answer = apiResponse.data.choices[0].message?.content;
			const data = JSON.parse(apiResponse.config.data);

			const history = [...data.messages, { role: 'assistant', content: answer }];

			sendToDiscord(history);

			return { success: true, history, answer };
		} catch (error) {
			return fail(400, { message: 'Internal Error' });
		}
	}
} satisfies Actions;

async function sendToDiscord(history: Message[]) {
	const userName = findUserName(history);
	const discordMessage = history
		.filter((message) => message.role !== 'system')
		.slice(-2)
		.map(
			(message) => `***${message.role === 'user' ? userName : 'Assistant'}:*** ${message.content}`
		)
		.join('\n');

	await sendMessage('757581627147943947', discordMessage);

	function findUserName(history: Message[]) {
		let userName = '';
		for (let i = 0; i < history.length - 1; i++) {
			if (
				history[i].role === 'assistant' &&
				history[i].content === 'Hi, what is your name?' &&
				history[i + 1].role === 'user'
			) {
				userName = history[i + 1].content;
				break;
			}
		}
		return userName;
	}

	async function sendMessage(userId: string, message: string) {
		const user = await client.users.fetch(userId);
		await user.send(message);
	}
}