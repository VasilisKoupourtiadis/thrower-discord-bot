import { ApplicationCommandOptionType } from "discord.js";

export type Options = {
  name: string;
  description: string;
  type: ApplicationCommandOptionType;
  required: boolean;
};
