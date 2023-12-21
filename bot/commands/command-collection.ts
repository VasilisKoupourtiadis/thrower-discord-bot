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
        name: "user-throwing",
        description: "The user who's throwing (it's Daco isn't it?)",
        type: ApplicationCommandOptionType.User,
        required: true,
      },
    ],
  },
  {
    name: "check",
    description: "Check how many times a user has thrown",
    options: [
      {
        name: "counter-to-check",
        description: "The throw counter to check (raid or normal)",
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
        name: "user-to-be-checked",
        description: "Name of the user you want to check",
        type: ApplicationCommandOptionType.User,
        required: true,
      },
    ],
  },
  {
    name: "leaderboard",
    description: "Get the top 3 worst throwers in the server",
  },
  {
    name: "reset",
    description: "Resets a users throw-count or raid-throw-count",
    options: [
      {
        name: "counter-to-reset",
        description: "The counter to reset",
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
        name: "user-to-reset",
        description: "The user you want to reset the counter for",
        type: ApplicationCommandOptionType.User,
        required: true,
      },
    ],
  },
  {
    name: "reset-all",
    description: "Resets every users counter (raid and normal)",
  },
];
