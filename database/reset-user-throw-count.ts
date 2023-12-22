import { User } from "../models/user-schema";
import { User as discordUser } from "discord.js";
import { logger } from "../logger";
import { CommandNamesAndOptions } from "../enums/enums";

let count: boolean;
let userIsAdminOrGuildOwner: boolean;

export const resetUserThrowCount = async (
  userToReset: discordUser,
  action: string,
  userWhoSentCommand: string
) => {
  const query = {
    id: [userToReset.id, userWhoSentCommand],
  };

  count = action === CommandNamesAndOptions.ThrowCount.valueOf();

  try {
    const users = await User.find(query);

    if (users) {
      const resetUser = users.find((x) => x.id === userToReset.id);
      const commandSentByUser = users.find((x) => x.id === userWhoSentCommand);

      commandSentByUser?.isAdmin || commandSentByUser?.isGuildOwner
        ? (userIsAdminOrGuildOwner = true)
        : (userIsAdminOrGuildOwner = false);

      if (userIsAdminOrGuildOwner && resetUser !== undefined) {
        count ? (resetUser.throwCount = 0) : (resetUser.raidThrowCount = 0);
        await resetUser.save().catch((error) => {
          logger.error(
            "While trying to save changes to user's throw count:" + error
          );
          return;
        });
      }
    }

    return userIsAdminOrGuildOwner;
  } catch (error) {
    count
      ? logger.error("While trying to reset throw count:" + error)
      : logger.error("While trying to reset raid throw count:" + error);
  }
};
