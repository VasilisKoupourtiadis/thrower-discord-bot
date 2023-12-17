import { User } from "../models/user-schema";
import { User as discordUser } from "discord.js";

export const checkThrowCounter = async (personThrowing: discordUser) => {
  const query = {
    userId: personThrowing.id,
  };

  try {
    const user = await User.findOne(query);

    if (!user) return -1;

    return user.throwCount;
  } catch (error) {
    console.log("Error while trying to get throw count:" + error);
    return -1;
  }
};
