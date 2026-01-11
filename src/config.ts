import fs from 'fs';
import path from 'path';
import '@dotenvx/dotenvx/config';

/**
 * v10m configuration
 */
export interface Config {
  debug: boolean;
  discord: {
    appId: string;
    publicKey: string;
    clientSecret: string;
    botToken: string;
  };
}

/**
 * Partial configuration for overrides
 */
export type PartialConfig = Partial<{
  debug: boolean;
  discord: Partial<Config['discord']>;
}>;

/**
 * Default configuration
 */
const defaults: Config = {
  debug: false,
  discord: {
    appId: '',
    publicKey: '',
    clientSecret: '',
    botToken: '',
  },
};

/**
 * Load configuration from files
 * @returns configuration overrides
 */
function loadFromFile(): PartialConfig {
  const configPaths = [
    path.join(process.cwd(), 'aphro.config.json'),
    path.join(process.env.HOME ?? '~', '.aphro.config.json'),
  ];

  for (const configPath of configPaths) {
    if (fs.existsSync(configPath)) {
      try {
        const content = fs.readFileSync(configPath, 'utf-8');
        return JSON.parse(content) as PartialConfig;
      } catch (err) {
        console.warn(`Failed to parse config file ${configPath}:`, err);
      }
    }
  }

  return {};
}

/**
 * Load configuration from environment variables
 * @returns configuration overrides
 */
function loadFromEnv(): PartialConfig {
  return {
    debug: process.env.APHRO_DEBUG === 'true' ? true : undefined,
    discord: {
      appId: process.env.APHRO_DISCORD_APP_ID,
      publicKey: process.env.APHRO_DISCORD_PUBLIC_KEY,
      clientSecret: process.env.APHRO_DISCORD_CLIENT_SECRET,
      botToken: process.env.APHRO_DISCORD_BOT_TOKEN,
    },
  };
}

/**
 * Merges all configurations and defaults
 * @param configs list of overrides
 * @returns final configuration
 */
function merge(...configs: PartialConfig[]): Config {
  const result: Config = { ...defaults };

  for (const config of configs) {
    if (config.debug !== undefined) {
      result.debug = config.debug;
    }

    if (config.discord) {
      if (config.discord.appId !== undefined) {
        result.discord.appId = config.discord.appId;
      }
      if (config.discord.publicKey !== undefined) {
        result.discord.publicKey = config.discord.publicKey;
      }
      if (config.discord.clientSecret !== undefined) {
        result.discord.clientSecret = config.discord.clientSecret;
      }
      if (config.discord.botToken !== undefined) {
        result.discord.botToken = config.discord.botToken;
      }
    }
  }

  return result;
}

/**
 * Configuration manager
 */
export class ConfigManager {
  private _config: Config;

  constructor(overrides: PartialConfig = {}) {
    const fileConfig = loadFromFile();
    const envConfig = loadFromEnv();

    this._config = merge(fileConfig, envConfig, overrides);
  }

  get config(): Readonly<Config> {
    return this._config;
  }

  update(overrides: PartialConfig): void {
    this._config = merge(this._config, overrides);
  }
}
