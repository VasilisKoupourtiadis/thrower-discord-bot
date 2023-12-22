import "dotenv/config";

type Dependency = {
  discordToken: string;
  testGuildId: string;
  guildId: string;
  clientId: string;
  specialAdminF: string;
  specialAdminD: string;
  connectionString: string;
  logFile: string;
};

export const dependencies: Dependency = {
  discordToken: process.env.DISCORD_TOKEN as string,
  testGuildId: process.env.TEST_GUILD_ID as string,
  guildId: process.env.GUILD_ID as string,
  clientId: process.env.CLIENT_ID as string,
  specialAdminF: process.env.SPECIAL_ADMIN_F as string,
  specialAdminD: process.env.SPECIAL_ADMIN_D as string,
  connectionString: process.env.CONNECTION_STRING as string,
  logFile: process.env.LOG_FILE as string,
};
