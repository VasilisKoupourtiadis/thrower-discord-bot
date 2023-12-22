import "dotenv/config";
import { dependencies } from "./dependencies";
import { CommandNamesAndOptions, Channels } from "../enums/enums";
import { connectToDatabase } from "./functions/connect-to-database";
import { clientOnReady } from "./functions/client-on-ready";
import { interactionThrowing } from "./functions/interaction-throwing";
import { interactionCheck } from "./functions/interaction-check";
import { interactionLeaderboard } from "./functions/interaction-leaderboard";
import { interactionReset } from "./functions/interaction-reset";
import { interactionResetAll } from "./functions/interaction-reset-all";
import { Client, GatewayIntentBits, TextChannel } from "discord.js";

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.DirectMessages,
  ],
});

connectToDatabase;

client.on("ready", async (c) => {
  await clientOnReady(c);
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
      await interactionThrowing(botReply, correctChannel, interaction);
      break;
    case CommandNamesAndOptions.Check:
      await interactionCheck(botReply, correctChannel, interaction);
      break;
    case CommandNamesAndOptions.Leaderboard:
      await interactionLeaderboard(correctChannel, interaction, client);
      break;
    case CommandNamesAndOptions.Reset:
      await interactionReset(botReply, correctChannel, interaction);
      break;
    case CommandNamesAndOptions.ResetAll:
      await interactionResetAll(botReply, correctChannel, interaction);
      break;
    default:
      break;
  }
});

client.login(dependencies.discordToken);
