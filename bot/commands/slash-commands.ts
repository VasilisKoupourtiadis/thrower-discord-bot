import { ApplicationCommandOptionType, REST, Routes } from "discord.js";
import { dependencies } from "../dependencies";
import "dotenv/config";

const commands = [
  {
    name: "throwing",
    description: "Imagine throwing 🤣",
    options: [
      {
        name: "person-throwing",
        description: "The person who's throwing (it's Daco isn't it?)",
        type: ApplicationCommandOptionType.User,
        required: true,
      },
    ],
  },
];

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
