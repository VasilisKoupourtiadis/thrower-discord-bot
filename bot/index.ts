import "dotenv/config";
import { dependencies } from "./dependencies";
import mongoose from "mongoose";

import {
  Client,
  GatewayIntentBits,
  ActivityType,
  TextChannel,
  User,
  EmbedBuilder,
} from "discord.js";

const enum CommandNamesAndOptions {
  Throwing = "throwing",
  ThrowingOptionName = "person-throwing",
  Check = "check",
  CheckOptionName = "person-to-be-checked",
  Leaderboard = "leaderboard",
}

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.DirectMessages,
  ],
});

(async () => {
  try {
    await mongoose.connect(dependencies.connectionString);
    console.log("Connected to database");
  } catch (error) {
    console.log("Could not connect to db" + error);
  }
})();

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
          await interaction.reply({
            content: "Command successfully registered ✔",
            ephemeral: true,
          });
        } else {
          await interaction.reply(botReply);
        }
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

          await interaction.reply({
            content: "Command successfully registered ✔",
            ephemeral: true,
          });
        } else {
          await interaction.reply(botReply);
        }
      }
      break;
    case CommandNamesAndOptions.Leaderboard:
      {
        const embed = new EmbedBuilder()
          .setColor("Random")
          .setTitle("Leaderboard")
          .setAuthor({
            name: "Thrower",
            iconURL: "https://i.imgur.com/RoCxZ3b.png",
          })
          .setDescription("Here are Consultopia's worst throwers")
          .setThumbnail("https://i.imgur.com/wer9sUY.gif")
          .addFields(
            { name: "1. Daco", value: "5k throws" },
            { name: "2. Hugo", value: "4k throws" },
            { name: "3. Sam", value: "2k throws" }
          )
          .setImage("https://i.imgur.com/KHNxBqg.gif")
          .setTimestamp();

        if (!correctChannel) {
          await channel.send({
            embeds: [embed],
          });

          await interaction.reply({
            content: "Command successfully registered ✔",
            ephemeral: true,
          });
        } else {
          await interaction.reply({ embeds: [embed] });
        }
      }
      break;
    default:
      break;
  }
});

client.login(dependencies.discordToken);
