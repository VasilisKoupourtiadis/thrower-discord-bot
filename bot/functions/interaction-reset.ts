import { ChatInputCommandInteraction, User } from "discord.js";
import { CommandNamesAndOptions } from "../../enums/enums";
import { resetUserThrowCount } from "../../database/reset-user-throw-count";

export const interactionReset = async (
  botReply: string,
  correctChannel: boolean,
  interaction: ChatInputCommandInteraction
) => {
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
