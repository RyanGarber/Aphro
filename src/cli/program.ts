import { Command } from 'commander';
import { Client } from '../bot/index.js';
import pkg from '../../package.json' with { type: 'json' };

export class Program {
  private program: Command;

  constructor() {
    this.program = new Command();

    this.program
      .name('aphro')
      .description(pkg.description)
      .version(pkg.version)
      .action(async () => {
        const client = new Client();
        await client.connect();
      });
  }

  public run(argv: string[]) {
    this.program.parse(argv);
  }
}
