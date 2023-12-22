import { ChatInputCommandInteraction } from "discord.js";
import { resetAllUserThrowCounters } from "../../database/reset-all-user-throw-counters";

export const interactionResetAll = async (
  botReply: string,
  correctChannel: boolean,
  interaction: ChatInputCommandInteraction
) => {
  const userWhoSentCommand: string = interaction.user.id;

  botReply = `Successfully reset all user throw counters`;

  const userIsAdminOrGuildOwner = await resetAllUserThrowCounters(
    userWhoSentCommand
  );

  if (
    (!userIsAdminOrGuildOwner && !correctChannel) ||
    (!userIsAdminOrGuildOwner && correctChannel)
  ) {
    await interaction.reply({
      content: "Sorry, this command is reserved for guild owners and admins",
      ephemeral: true,
    });
  } else if (userIsAdminOrGuildOwner && !correctChannel) {
    await interaction.reply({
      content: "Sorry, you're not allowed to run commands in this channel",
      ephemeral: true,
    });
  } else {
    await interaction.reply({
      content: botReply,
      ephemeral: true,
    });
  }
};
