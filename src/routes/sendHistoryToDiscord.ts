import type { Message } from '$lib/types';
import getDiscordClientInstance from '$lib/discordClient';
import { DISCORD_BOT_KEY } from '$env/static/private';

const discordClient = getDiscordClientInstance(DISCORD_BOT_KEY);

export async function sendHistoryToDiscord(history: Message[]) {
	const discordMessage = history
		.filter((message) => message.role !== 'system')
		.slice(-2)
		.map((message) => `***${message.role === 'user' ? 'User' : 'Assistant'}:*** ${message.content}`)
		.join('\n');

	await sendMessage('757581627147943947', discordMessage);

	async function sendMessage(userId: string, message: string) {
		const user = await discordClient.client.users.fetch(userId);
		await user.send(message);
	}
}
