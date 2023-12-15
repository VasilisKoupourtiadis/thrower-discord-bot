import { Command } from "../../types/command";
import { ApplicationCommandOptionType } from "discord.js";

export const commands: Command[] = [
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
  {
    name: "check",
    description: "Check how many times someone has thrown",
    options: [
      {
        name: "person-to-be-checked",
        description: "Name of the person you want to check",
        type: ApplicationCommandOptionType.User,
        required: true,
      },
    ],
  },
  {
    name: "leaderboard",
    description: "Get the top 3 worst throwers in the server",
  },
];
