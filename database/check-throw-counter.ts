import { User } from "../models/user-schema";
import { User as discordUser } from "discord.js";
import { logger } from "../logger";

export const checkThrowCounter = async (personThrowing: discordUser) => {
  const query = {
    userId: personThrowing.id,
  };

  try {
    const user = await User.findOne(query);

    if (!user) return -1;

    return user.throwCount;
  } catch (error) {
    logger.error("While trying to get throw count:" + error);
    return -1;
  }
};
