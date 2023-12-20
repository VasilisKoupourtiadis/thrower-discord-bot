import { Command } from "../../models/command";
import { ApplicationCommandOptionType } from "discord.js";

export const commands: Command[] = [
  {
    name: "throwing",
    description: "Imagine throwing 🤣",
    options: [
      {
        name: "counter-to-update",
        description: "The throw counter to update (raid or normal)",
        type: ApplicationCommandOptionType.String,
        choices: [
          {
            name: "throw-count",
            value: "normal",
          },
          {
            name: "raid-throw-count",
            value: "raid",
          },
        ],
        required: true,
      },
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
