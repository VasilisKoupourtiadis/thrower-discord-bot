import { REST, Routes } from "discord.js";
import { dependencies } from "../dependencies";
import { commands } from "./command-collection";
import { logger } from "../../logger";

const rest = new REST().setToken(dependencies.discordToken);

export const registerCommands = async (guildIds: string[]) => {
  try {
    logger.info("Registering commands");

    guildIds.forEach(async (guild) => {
      await rest.put(
        Routes.applicationGuildCommands(dependencies.clientId, guild),
        { body: commands }
      );
    });

    logger.info("Commands registered");
  } catch (error) {
    logger.error(`While registering commands ${error}`);
  }
};
