import { ExtendedClient } from "../structures/Client";

interface RunOptions {
  client: ExtendedClient;
  channel: string;
  tags: any;
  message: string;
  self: boolean;
  args: string[];
}

type RunFunction = (options: RunOptions) => any;

export type CommandType = {
  name: string;
  run: RunFunction;
};
