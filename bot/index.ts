import "dotenv/config";
import { dependencies } from "./dependencies";

import {
  Client,
  GatewayIntentBits,
  ActivityType,
  TextChannel,
} from "discord.js";

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.DirectMessages,
  ],
});

client.on("ready", (c) => {
  console.log(`${c.user.username} is online`);

  client.user?.setActivity({
    name: "Daco throw",
    type: ActivityType.Watching,
  });
});

client.on("interactionCreate", (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const channel = client.channels.cache.get(
    dependencies.channelId
  ) as TextChannel;

  const correctChannel = interaction.channel?.id === channel?.id;

  const user = interaction.options.get("person-throwing")?.user;

  const botReply = `<@${user?.id}> IS THROWING. THEY'RE TRASH`;

  if (interaction.commandName === "throwing" && correctChannel) {
    interaction.reply(botReply);
  } else if (interaction.commandName === "throwing" && !correctChannel) {
    channel.send({
      content: botReply,
    });

    interaction.reply({
      content: "Commmand successfully registered",
      ephemeral: true,
    });
  }
});

client.login(dependencies.discordToken);
