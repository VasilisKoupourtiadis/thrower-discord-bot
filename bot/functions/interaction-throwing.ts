import { ChatInputCommandInteraction, User } from "discord.js";
import { CommandNamesAndOptions } from "../../enums/enums";
import { increaseThrowCounter } from "../../database/increase-throw-counter";

export const interactionThrowing = async (
  botReply: string,
  correctChannel: boolean,
  interaction: ChatInputCommandInteraction
) => {
  const counterToUpdate = interaction.options.get(
    CommandNamesAndOptions.CounterToUpdate
  )?.value as string;

  const userThrowing = interaction.options.get(
    CommandNamesAndOptions.ThrowingOptionName
  )?.user as User;

  botReply = `<@${userThrowing.id}> IS THROWING. THEY'RE TRASH`;

  if (!correctChannel) {
    await interaction.reply({
      content: "Sorry, you're not allowed to run commands in this channel",
      ephemeral: true,
    });
  } else {
    await interaction.reply(botReply);
    await increaseThrowCounter(userThrowing, counterToUpdate);
  }
};
