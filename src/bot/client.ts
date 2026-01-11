import { ActivityType } from 'discord.js';
import { SapphireClient } from '@sapphire/framework';
import { formatString } from '../util/format.js';
import { ConfigManager, type PartialConfig } from '../config.js';
import { DISCORD_ADD_BOT } from '../consts.js';

export class Client {
  private client: SapphireClient;
  private configManager: ConfigManager;

  constructor(overrides: PartialConfig = {}) {
    this.configManager = new ConfigManager(overrides);

    console.log(`Starting bot with config:`, this.configManager.config);
    console.log(
      'Add it to your Discord:',
      formatString(DISCORD_ADD_BOT, { clientId: this.configManager.config.discord.appId })
    );

    this.client = new SapphireClient({
      intents: [
        'Guilds',
        'GuildMessages',
        'MessageContent',
        'GuildMembers',
        'GuildMessageReactions',
        'DirectMessages',
        'DirectMessageReactions',
        'GuildPresences',
        'GuildVoiceStates',
        'GuildEmojisAndStickers',
      ],
      presence: {
        status: 'online',
        activities: [
          {
            name: 'finding femboys',
            type: ActivityType.Playing,
          },
        ],
      },
    });
  }

  public async connect(): Promise<void> {
    await this.client.login(this.configManager.config.discord.botToken);
  }
}
