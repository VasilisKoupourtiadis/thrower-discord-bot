import { User } from "../models/user-schema";
import { logger } from "../logger";

export const resetAllUserThrowCounters = async () => {
  try {
    const users = await User.find();

    users.forEach((user) => {
      user.throwCount = 0;
      user.raidThrowCount = 0;
    });

    await User.bulkSave(users).catch((error) => {
      logger.error("While trying to save changes to user:" + error);
      return;
    });
    logger.info("Reset counters for all users");
  } catch (error) {
    logger.error("While trying to get users and resetting counters" + error);
  }
};
