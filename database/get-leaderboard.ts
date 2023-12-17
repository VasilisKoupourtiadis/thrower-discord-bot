import { User } from "../models/user-schema";

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
        id: user.userId,
        count: user.throwCount,
      };

      users.push(userToAdd);
    });

    const sortedUsers = users.sort((a, b) => b.count - a.count).slice(0, 3);

    return sortedUsers;
  } catch (error) {
    console.log("Error while trying to get users" + error);
    return users;
  }
};
