import { REST, Routes } from "discord.js";
import { dependencies } from "../dependencies";
import { commands } from "./command-collection";
import { logger } from "../../logger";

const rest = new REST().setToken(dependencies.discordToken);

(async () => {
  try {
    logger.info("Registering commands");

    await rest.put(
      Routes.applicationGuildCommands(
        dependencies.clientId,
        dependencies.guildId
      ),
      { body: commands }
    );

    logger.info("Commands registered");
  } catch (error) {
    logger.error(`While registering commands ${error}`);
  }
})();
