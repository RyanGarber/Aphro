import { Client, Events, GatewayIntentBits } from 'discord.js';
import 'dotenv/config';

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
  ],
});

client.once(Events.ClientReady, (client) => {
  console.log(`Logged in as ${client.user.tag}`);
});

client.on(Events.MessageCreate, (message) => {
  if (message.content === 'ping') {
    void message.channel.send('pong');
  }
});

await client.login(process.env.DISCORD_TOKEN);
