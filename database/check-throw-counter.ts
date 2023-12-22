import { User } from "../models/user-schema";
import { User as discordUser } from "discord.js";
import { logger } from "../logger";
import { CommandNamesAndOptions } from "../enums/enums";

type InternalResult = {
  count: number;
  actionType?: string;
};

export const checkThrowCounter = async (
  userToCheck: discordUser,
  action: string
) => {
  const query = {
    id: userToCheck.id,
  };

  let result: InternalResult;

  try {
    const user = await User.findOne(query);

    if (!user) return (result = { count: -1 });

    result = {
      count:
        action === CommandNamesAndOptions.ThrowCount.valueOf()
          ? user.throwCount
          : user.raidThrowCount,
      actionType: action,
    };

    return result;
  } catch (error) {
    logger.error("While trying to get throw count:" + error);
    return (result = { count: -1 });
  }
};
