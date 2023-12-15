import { Options } from "../types/options";

export type Command = {
  name: string;
  description: string;
  options?: Options[];
};
