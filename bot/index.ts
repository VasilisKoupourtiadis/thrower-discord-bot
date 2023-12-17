import "dotenv/config";
import { dependencies } from "./dependencies";
import mongoose from "mongoose";
import { increaseThrowCounter } from "../database/increase-throw-counter";
import { checkThrowCounter } from "../database/check-throw-counter";
import { getLeaderboard } from "../database/get-leaderboard";

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

        await increaseThrowCounter(userThrowing);
      }
      break;
    case CommandNamesAndOptions.Check:
      {
        const userToBeChecked = interaction.options.get(
          CommandNamesAndOptions.CheckOptionName
        )?.user as User;

        const throwCount = await checkThrowCounter(userToBeChecked);

        botReply = `<@${userToBeChecked.id}> has thrown ${throwCount} times`;

        if (throwCount === -1) {
          botReply = "Sorry, could not get user";

          await interaction.reply({
            content: botReply,
            ephemeral: true,
          });

          break;
        } else if (!correctChannel) {
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
          .setImage("https://i.imgur.com/KHNxBqg.gif")
          .setTimestamp();

        const leaderboard = await getLeaderboard();

        embed.data.fields = [];

        for await (let user of leaderboard) {
          let rank = leaderboard.indexOf(user) + 1;

          const discordName = await client.users.fetch(user.id);

          embed.addFields({
            name: `${rank}. ${discordName.displayName}`,
            value: `${user.count} throws`,
          });
        }

        if (leaderboard.length === 0) {
          await interaction.reply({
            content: "Sorry, could not get leaderboard information",
            ephemeral: true,
          });
        }

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
