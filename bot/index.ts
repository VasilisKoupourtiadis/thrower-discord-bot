import "dotenv/config";
import { dependencies } from "./dependencies";

import {
  Client,
  GatewayIntentBits,
  ActivityType,
  TextChannel,
  User,
} from "discord.js";

const enum CommandNamesAndOptions {
  Throwing = "throwing",
  Check = "check",
  ThrowingOptionName = "person-throwing",
  CheckOptionName = "person-to-be-checked",
}

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

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const channel = client.channels.cache.get(
    dependencies.channelId
  ) as TextChannel;

  const correctChannel = interaction.channel?.id === channel?.id;

  let botReply: string = "";

  switch (interaction.commandName) {
    case CommandNamesAndOptions.Throwing:
      {
        const userThrowing = interaction.options.get(
          CommandNamesAndOptions.ThrowingOptionName
        )?.user as User;

        botReply = `<@${userThrowing.id}> IS THROWING. THEY'RE TRASH`;

        if (!correctChannel) {
          await channel.send({
            content: botReply,
          });
        }

        await interaction.reply(botReply);
      }
      break;
    case CommandNamesAndOptions.Check:
      {
        const userToBeChecked = interaction.options.get(
          CommandNamesAndOptions.CheckOptionName
        )?.user as User;

        botReply = `<@${userToBeChecked.id}> has thrown 5 times`;

        if (!correctChannel) {
          await channel.send({
            content: botReply,
          });
        }

        await interaction.reply(botReply);
      }
      break;
    default:
      break;
  }
});

client.login(dependencies.discordToken);
