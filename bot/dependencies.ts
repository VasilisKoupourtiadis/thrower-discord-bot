import "dotenv/config";

type Dependency = {
  discordToken: string;
  guildId: string;
  clientId: string;
  channelId: string;
};

export const dependencies: Dependency = {
  discordToken: process.env.DISCORD_TOKEN as string,
  guildId: process.env.GUILD_ID as string,
  clientId: process.env.CLIENT_ID as string,
  channelId: process.env.CHANNEL_ID as string,
};
