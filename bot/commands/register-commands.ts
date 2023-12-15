import { REST, Routes } from "discord.js";
import { dependencies } from "../dependencies";
import { commands } from "./command-collection";
import "dotenv/config";

const rest = new REST().setToken(dependencies.discordToken);

(async () => {
  try {
    console.log("Registering commands");

    await rest.put(
      Routes.applicationGuildCommands(
        dependencies.clientId,
        dependencies.guildId
      ),
      { body: commands }
    );

    console.log("Commands registered");
  } catch (error) {
    console.log(error);
  }
})();
