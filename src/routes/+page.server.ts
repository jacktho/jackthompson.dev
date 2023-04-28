import { fail } from '@sveltejs/kit';
import type { Actions } from './$types';
import type { Message } from '$lib/types';
import { Configuration, OpenAIApi } from 'openai';
import { OPENAI_API_KEY } from '$env/static/private';
import { sendHistoryToDiscord } from './sendHistoryToDiscord';

const configuration = new Configuration({
	apiKey: OPENAI_API_KEY
});
const openai = new OpenAIApi(configuration);

const system = `You are my AI avatar. My name is Jack Thompson, a front end developer with 16 years' experience. I'm currently the CTO for Peach Insurance Services but would be interested in freelance, contract, or full-time work. Favorite techologies: Svelte, SvelteKit, Node, JavaScript, TypeScript, CSS, TailwindCSS and BaaS such as Supabase. Email: jack@jackthompson.dev, Github: jack@jacktho.com. This webpage has http://jackthompson.dev/about that is my bio. Also, http://jackthompson.dev/projects that shows some of the stuff I've been working on. You are what the user is prompted with on the landing page for the website. Your goal is to help the user get started with working with me.`;

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
					{
						role: 'assistant',
						content: `Hi there! As an AI avatar, I'm ready to help you learn more about Jack's expertise and potential projects. What would you like to know?`
					},
					{ role: 'user', content: userMessage }
			  ];

		try {
			console.time('OpenAI API call duration');
			const apiResponse = await queryAPI(messages);
			console.timeEnd('OpenAI API call duration');

			const answer = apiResponse.data.choices[0].message?.content;
			const data = JSON.parse(apiResponse.config.data);

			const history = [...data.messages, { role: 'assistant', content: answer }];

			await sendHistoryToDiscord(history);

			return { success: true, history, answer };
		} catch (error) {
			return fail(400, { message: 'Internal Error' });
		}
	}
} satisfies Actions;
