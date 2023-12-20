import { User } from "../models/user-schema";
import { User as discordUser } from "discord.js";
import { logger } from "../logger";
import { CommandNamesAndOptions } from "../enums/enums";

let count: boolean;

export const resetUserThrowCount = async (
  userToReset: discordUser,
  action: string
) => {
  const query = {
    userId: userToReset.id,
  };

  count = action === CommandNamesAndOptions.ThrowCount.valueOf();

  try {
    const user = await User.findOne(query);

    if (user) {
      count ? (user.throwCount = 0) : (user.raidThrowCount = 0);

      await user.save().catch((error) => {
        logger.error("While trying to save changes to user:" + error);
        return;
      });
    }
  } catch (error) {
    count
      ? logger.error("While trying to reset throw count:" + error)
      : logger.error("While trying to reset raid throw count:" + error);
  }
};
