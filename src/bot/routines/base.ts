export class Routine {
  private intervalMs = -1;

  // eslint-disable-next-line @typescript-eslint/require-await
  protected async run() {
    if (this.intervalMs > 0) {
      setTimeout(() => void this.run(), this.intervalMs);
    }
  }

  public start(intervalMs: number) {
    this.intervalMs = intervalMs;
    void this.run();
  }

  public stop() {
    this.intervalMs = -1;
  }
}
