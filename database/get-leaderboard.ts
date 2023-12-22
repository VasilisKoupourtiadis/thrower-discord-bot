import { User } from "../models/user-schema";
import { logger } from "../logger";

type internalUser = {
  id: string;
  count: number;
};

let users: internalUser[] = [];

export const getLeaderboard = async () => {
  try {
    users = [];

    (await User.find()).map((user) => {
      let userToAdd: internalUser = {
        id: user.id,
        count: user.throwCount,
      };

      users.push(userToAdd);
    });

    const sortedUsers = users.sort((a, b) => b.count - a.count).slice(0, 3);

    return sortedUsers;
  } catch (error) {
    logger.error("While trying to get users" + error);
    return users;
  }
};
