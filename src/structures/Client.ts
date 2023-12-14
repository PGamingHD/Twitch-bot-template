import { Client } from "tmi.js";
import path from "path";
import { promisify } from "util";
import glob from "glob";
import { CommandType } from "../@types/Command";
const globPromise = promisify(glob);

export class ExtendedClient extends Client {
  commands: CommandType[] = [];

  start() {
    this.RegisterModules();
    this.connect();
  }

  async importFile(filePath: string) {
    return (await import(filePath))?.default;
  }

  async RegisterCommands(commands: CommandType[]) {
    this.commands = commands;
  }

  async RegisterModules() {
    const availableCommands: CommandType[] = [];

    const root = path.join(__dirname, "..");
    const commandFiles: string[] = await globPromise("/commands/*/*{.ts,.js}", {
      root,
    });

    for (const file of commandFiles) {
      const command: CommandType = await this.importFile(file);
      if (!command.name) return;

      availableCommands.push(command);
      console.log(`[CMD] Added command '${command.name}' to the list!`);
      //REGISTER COMMAND HERE!
    }

    this.on("connected", () => {
      this.RegisterCommands(availableCommands);
      console.log("[DEBUG] Connected to Twitch");
    });

    const eventFiles: string[] = await globPromise("/events/*{.ts,.js}", {
      root,
    });
    for (const file of eventFiles) {
      const event = await this.importFile(file);
      this.on(event.event, event.run);
    }
  }
}
