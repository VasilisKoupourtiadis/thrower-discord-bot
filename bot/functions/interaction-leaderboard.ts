import { ChatInputCommandInteraction } from "discord.js";
import { EmbedBuilder, Client } from "discord.js";
import { getLeaderboard } from "../../database/get-leaderboard";

export const interactionLeaderboard = async (
  correctChannel: boolean,
  interaction: ChatInputCommandInteraction,
  client: Client
) => {
  const embed = new EmbedBuilder()
    .setColor("Red")
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
      content: "Sorry, you're not allowed to run commands in this channel",
      ephemeral: true,
    });
  } else if (correctChannel && leaderboard.length === 0) {
    await interaction.reply({
      content: "Sorry, could not get leaderboard information",
      ephemeral: true,
    });
  } else {
    await interaction.reply({ embeds: [embed] });
  }
};
