import { REST, Routes } from "discord.js";
import { dependencies } from "../dependencies";
import { commands } from "./command-collection";
import { Guild } from "../../models/guild";
import { logger } from "../../logger";

const rest = new REST().setToken(dependencies.discordToken);

export const registerCommands = async (guilds: Guild[]) => {
  try {
    logger.info("Registering commands");

    guilds.forEach(async (guild) => {
      await rest.put(
        Routes.applicationGuildCommands(dependencies.clientId, guild.id),
        { body: commands }
      );
    });

    logger.info("Commands registered");
  } catch (error) {
    logger.error(`While registering commands ${error}`);
  }
};
