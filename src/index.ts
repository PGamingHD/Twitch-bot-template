import "dotenv/config";
import { ExtendedClient } from "./structures/Client";

export const client = new ExtendedClient({
  options: { debug: true },
  identity: {
    username: process.env.TWITCH_USERNAME,
    password: process.env.TWITCH_OAUTH,
  },
  channels: ["pgamingjr"], // CHANNELS THE BOT SHOULD BE IN
});

client.start();
