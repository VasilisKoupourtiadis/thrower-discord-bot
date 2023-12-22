import "dotenv/config";
import { dependencies } from "./dependencies";
import mongoose from "mongoose";
import { increaseThrowCounter } from "../database/increase-throw-counter";
import { checkThrowCounter } from "../database/check-throw-counter";
import { getLeaderboard } from "../database/get-leaderboard";
import { resetUserThrowCount } from "../database/reset-user-throw-count";
import { resetAllUserThrowCounters } from "../database/reset-all-user-throw-counters";
import { registerCommands } from "./commands/register-commands";
import { setGuildOwners } from "../database/set-guild-owners";
import { setSpecialGuildAdmins } from "../database/set-special-guild-admins";
import { CommandNamesAndOptions, Channels } from "../enums/enums";
import { Guild } from "../models/guild";
import { logger } from "../logger";

import {
  Client,
  GatewayIntentBits,
  ActivityType,
  TextChannel,
  User,
  EmbedBuilder,
} from "discord.js";

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.DirectMessages,
  ],
});

let logMessage: string = "";

(async () => {
  try {
    await mongoose.connect(dependencies.connectionString);
    logMessage = "Connected to database";

    console.log(logMessage);
    logger.info(logMessage);
  } catch (error) {
    logMessage = "Could not connect to db" + error;

    console.log(logMessage);
    logger.error(logMessage);
  }
})();

client.on("ready", async (c) => {
  logMessage = `${c.user.username} is online`;

  console.log(logMessage);
  logger.info(logMessage);

  const guilds: Guild[] = [];

  c.guilds.cache.map((g) => {
    const guild: Guild = {
      id: g.id,
      owner: g.ownerId,
    };
    guilds.push(guild);
  });

  await registerCommands(guilds);
  await setGuildOwners(guilds);
  await setSpecialGuildAdmins(guilds);

  client.user?.setActivity({
    name: "Daco throw",
    type: ActivityType.Watching,
  });
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const channel = interaction.channel as TextChannel;
  const correctChannel =
    channel.name.toLowerCase().includes(Channels.Bot) ||
    channel.name.toLowerCase().includes(Channels.Throw);

  let botReply: string = "";

  switch (interaction.commandName) {
    case CommandNamesAndOptions.Throwing:
      {
        const counterToUpdate = interaction.options.get(
          CommandNamesAndOptions.CounterToUpdate
        )?.value as string;

        const userThrowing = interaction.options.get(
          CommandNamesAndOptions.ThrowingOptionName
        )?.user as User;

        botReply = `<@${userThrowing.id}> IS THROWING. THEY'RE TRASH`;

        if (!correctChannel) {
          await interaction.reply({
            content:
              "Sorry, you're not allowed to run commands in this channel",
            ephemeral: true,
          });

          break;
        }

        await interaction.reply(botReply);

        await increaseThrowCounter(userThrowing, counterToUpdate);
      }
      break;
    case CommandNamesAndOptions.Check:
      {
        const userToBeChecked = interaction.options.get(
          CommandNamesAndOptions.CheckOptionName
        )?.user as User;

        const counterToCheck = interaction.options.get(
          CommandNamesAndOptions.CounterToCheck
        )?.value as string;

        const checkResult = await checkThrowCounter(
          userToBeChecked,
          counterToCheck
        );

        botReply =
          checkResult.actionType === CommandNamesAndOptions.ThrowCount.valueOf()
            ? `<@${userToBeChecked.id}> has thrown ${checkResult.count} time(s)`
            : `<@${userToBeChecked.id}> has thrown ${checkResult.count} time(s) during this activity`;

        if ((!correctChannel && checkResult.count === -1) || !correctChannel) {
          await interaction.reply({
            content:
              "Sorry, you're not allowed to run commands in this channel",
            ephemeral: true,
          });

          break;
        } else if (correctChannel && checkResult.count === -1) {
          await interaction.reply({
            content: "Sorry, could not get user",
            ephemeral: true,
          });

          break;
        }

        await interaction.reply(botReply);
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

        if ((!correctChannel && leaderboard.length === 0) || !correctChannel) {
          await interaction.reply({
            content:
              "Sorry, you're not allowed to run commands in this channel",
            ephemeral: true,
          });

          break;
        } else if (correctChannel && leaderboard.length === 0) {
          await interaction.reply({
            content: "Sorry, could not get leaderboard information",
            ephemeral: true,
          });

          break;
        }

        await interaction.reply({ embeds: [embed] });
      }
      break;
    case CommandNamesAndOptions.Reset:
      {
        const userWhoSentCommand: string = interaction.user.id;

        const userToReset = interaction.options.get(
          CommandNamesAndOptions.UserToBeReset
        )?.user as User;

        const counterToReset = interaction.options.get(
          CommandNamesAndOptions.CounterToReset
        )?.value as string;

        botReply =
          counterToReset === CommandNamesAndOptions.ThrowCount.valueOf()
            ? `Successfully reset ${userToReset.displayName}'s throw counter`
            : `Successfully reset ${userToReset.displayName}'s raid throw counter`;

        const userIsAdminOrGuildOwner = await resetUserThrowCount(
          userToReset,
          counterToReset,
          userWhoSentCommand
        );

        console.log(userIsAdminOrGuildOwner);

        if (
          (!userIsAdminOrGuildOwner && !correctChannel) ||
          (!userIsAdminOrGuildOwner && correctChannel)
        ) {
          await interaction.reply({
            content:
              "Sorry, this command is reserved for guild owners and admins",
            ephemeral: true,
          });

          break;
        } else if (userIsAdminOrGuildOwner && !correctChannel) {
          await interaction.reply({
            content:
              "Sorry, you're not allowed to run commands in this channel",
            ephemeral: true,
          });

          break;
        }

        await interaction.reply({
          content: botReply,
          ephemeral: true,
        });
      }
      break;
    case CommandNamesAndOptions.ResetAll: {
      const userWhoSentCommand: string = interaction.user.id;

      const userIsAdminOrGuildOwner = await resetAllUserThrowCounters(
        userWhoSentCommand
      );

      if (
        (!userIsAdminOrGuildOwner && !correctChannel) ||
        (!userIsAdminOrGuildOwner && correctChannel)
      ) {
        await interaction.reply({
          content:
            "Sorry, this command is reserved for guild owners and admins",
          ephemeral: true,
        });

        break;
      } else if (userIsAdminOrGuildOwner && !correctChannel) {
        await interaction.reply({
          content: "Sorry, you're not allowed to run commands in this channel",
          ephemeral: true,
        });

        break;
      }

      botReply = `Successfully reset all user throw counters`;

      await interaction.reply({
        content: botReply,
        ephemeral: true,
      });
    }
    default:
      break;
  }
});

client.login(dependencies.discordToken);
