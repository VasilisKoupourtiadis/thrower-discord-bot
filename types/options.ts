import { ApplicationCommandOptionType } from "discord.js";

export type options = {
  name: string;
  descripttion: string;
  type: ApplicationCommandOptionType;
  required: boolean;
};
