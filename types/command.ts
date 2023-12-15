import { Options } from "discord.js";

export type Command = {
  name: string;
  description: string;
  options: Options[];
};
