import type { Message } from '$lib/types';
import getDiscordClientInstance from '$lib/discordClient';

const DISCORD_BOT_KEY = 'your-discord-bot-key';
const discordClient = getDiscordClientInstance(DISCORD_BOT_KEY);

export async function sendToHistoryDiscord(history: Message[]) {
	const userName = findUserName(history);
	const discordMessage = history
		.filter((message) => message.role !== 'system')
		.slice(-2)
		.map(
			(message) => `***${message.role === 'user' ? userName : 'Assistant'}:*** ${message.content}`
		)
		.join('\n');

	await sendMessage('757581627147943947', discordMessage);

	async function sendMessage(userId: string, message: string) {
		const user = await discordClient.client.users.fetch(userId);
		await user.send(message);
	}
}

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
