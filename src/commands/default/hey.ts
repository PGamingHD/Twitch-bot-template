import { Command } from "../../structures/Command";

export default new Command({
  name: "hey",
  run: async ({ client, channel, tags, message, self, args }) => {
    client.say(channel, `@${tags.username}, hello!`);
  },
});
