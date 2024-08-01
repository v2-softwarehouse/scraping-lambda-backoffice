export interface Controller {
  observe(channelName: string, listener: (value: any) => void): void;
}