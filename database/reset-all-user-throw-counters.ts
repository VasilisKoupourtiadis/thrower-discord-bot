import { User } from "../models/user-schema";
import { logger } from "../logger";

let userIsAdminOrGuildOwner: boolean;

export const resetAllUserThrowCounters = async (userWhoSentCommand: string) => {
  try {
    const users = await User.find();
    const commandSentByUser = users.find((x) => x.id === userWhoSentCommand);

    commandSentByUser?.isAdmin || commandSentByUser?.isGuildOwner
      ? (userIsAdminOrGuildOwner = true)
      : (userIsAdminOrGuildOwner = false);

    if (userIsAdminOrGuildOwner) {
      users.forEach((user) => {
        user.throwCount = 0;
        user.raidThrowCount = 0;
      });

      await User.bulkSave(users).catch((error) => {
        logger.error("While trying to save changes to user:" + error);
        return;
      });
      logger.info("Reset counters for all users");
    }

    return userIsAdminOrGuildOwner;
  } catch (error) {
    logger.error("While trying to get users and resetting counters" + error);
  }
};
