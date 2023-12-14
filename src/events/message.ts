import { CommandType } from "../@types/Command";
import { Event } from "../structures/Event";
import { client } from "../index";
import { ChatUserstate } from "tmi.js";

export default new Event(
  "message",
  async (
    channel: string,
    tags: ChatUserstate,
    message: string,
    self: boolean
  ) => {
    if (self) return;

    channel = channel.replace("#", "");

    const prefixRegex: RegExp = new RegExp(`${escapeRegex("!")}`);

    if (!prefixRegex.test(message)) return;

    const args: string[] = message.slice(1).trim().split(/ +/).filter(Boolean);
    const cmd: string | null | undefined =
      args.length > 0 ? args.shift()?.toLowerCase() : null;

    if (!cmd || cmd.length === 0) return;

    const command: CommandType | undefined = client.commands.find(
      (c) => c.name === cmd
    );
    if (!command) return;

    try {
      await command.run({ client, channel, tags, message, self, args });
    } catch {
      console.error("[ERROR] Couldn't run specific command!");
    }
  }
);

function escapeRegex(str: string): string | void {
  try {
    return str.replace(/[.*+?^${}()|[\]\\]/g, `\\$&`);
  } catch (e) {
    return console.log("ERR");
  }
}
