import { Routine } from './base.js';

export class AvatarRoutine extends Routine {
  public override async run(): Promise<void> {
    console.log('Running Avatar Routine...');
    // client.user.setAvatar()
    await super.run();
  }
}
