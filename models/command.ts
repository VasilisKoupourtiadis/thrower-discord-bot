import { Options } from "../models/options";

export type Command = {
  name: string;
  description: string;
  options?: Options[];
};
