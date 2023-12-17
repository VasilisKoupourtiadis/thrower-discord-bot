import { User } from "../models/user-schema";
import { User as discordUser } from "discord.js";

export const increaseThrowCounter = async (personThrowing: discordUser) => {
  const query = {
    userId: personThrowing.id,
  };

  try {
    const user = await User.findOne(query);

    if (user) {
      user.throwCount++;

      await user.save().catch((error) => {
        console.log("Error while trying to save changes to user:" + error);
        return;
      });
    } else {
      const newUser = new User({
        userId: personThrowing.id,
        throwCount: 1,
      });

      await newUser.save();
    }
  } catch (error) {
    console.log("Error while trying to increase throw count:" + error);
  }
};
