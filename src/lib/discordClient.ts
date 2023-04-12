import { Client, GatewayIntentBits } from 'discord.js';

let instance: { client: Client } | null = null;

function createDiscordClient(DISCORD_BOT_KEY: string) {
	const client = new Client({
		intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages]
	});
	client.login(DISCORD_BOT_KEY);

	return {
		client
	};
}

function getDiscordClientInstance(DISCORD_BOT_KEY: string) {
	if (!instance) {
		instance = createDiscordClient(DISCORD_BOT_KEY);
	}
	return instance;
}

export default getDiscordClientInstance;
