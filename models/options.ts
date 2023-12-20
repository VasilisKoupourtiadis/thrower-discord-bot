import { ApplicationCommandOptionType } from "discord.js";
import { Choice } from "../models/choice";

export type Options = {
  name: string;
  description: string;
  type: ApplicationCommandOptionType;
  required: boolean;
  choices?: Choice[];
};
