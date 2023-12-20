import { User } from "../models/user-schema";
import { User as discordUser } from "discord.js";
import { logger } from "../logger";
import { CommandNamesAndOptions } from "../enums/enums";

export const increaseThrowCounter = async (
  userThrowing: discordUser,
  action: string
) => {
  const query = {
    userId: userThrowing.id,
  };

  try {
    const user = await User.findOne(query);

    if (user) {
      action === CommandNamesAndOptions.ThrowCount.valueOf()
        ? user.throwCount++
        : user.raidThrowCount++;

      await user.save().catch((error) => {
        logger.error("While trying to save changes to user:" + error);
        return;
      });
    } else {
      const newUser = new User({
        userId: userThrowing.id,
        throwCount: 1,
      });

      await newUser.save();
    }
  } catch (error) {
    logger.error("While trying to increase throw count:" + error);
  }
};
