import { ChatInputCommandInteraction, User } from "discord.js";
import { CommandNamesAndOptions } from "../../enums/enums";
import { checkThrowCounter } from "../../database/check-throw-counter";

export const interactionCheck = async (
  botReply: string,
  correctChannel: boolean,
  interaction: ChatInputCommandInteraction
) => {
  const userToBeChecked = interaction.options.get(
    CommandNamesAndOptions.CheckOptionName
  )?.user as User;

  const counterToCheck = interaction.options.get(
    CommandNamesAndOptions.CounterToCheck
  )?.value as string;

  const checkResult = await checkThrowCounter(userToBeChecked, counterToCheck);

  botReply =
    checkResult.actionType === CommandNamesAndOptions.ThrowCount.valueOf()
      ? `<@${userToBeChecked.id}> has thrown ${checkResult.count} time(s)`
      : `<@${userToBeChecked.id}> has thrown ${checkResult.count} time(s) during this activity`;

  if ((!correctChannel && checkResult.count === -1) || !correctChannel) {
    await interaction.reply({
      content: "Sorry, you're not allowed to run commands in this channel",
      ephemeral: true,
    });
  } else if (correctChannel && checkResult.count === -1) {
    await interaction.reply({
      content: "Sorry, could not get user",
      ephemeral: true,
    });
  } else {
    await interaction.reply(botReply);
  }
};
