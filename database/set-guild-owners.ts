import { User } from "../models/user-schema";
import { Guild } from "../models/guild";
import { logger } from "../logger";

export const setGuildOwners = async (guilds: Guild[]) => {
  try {
    guilds.forEach(async (guild) => {
      const query = {
        id: guild.owner,
      };

      const user = await User.findOne(query);

      if (!user) {
        const newUser = new User({
          id: guild.owner,
          isAdmin: true,
          isGuildOwner: true,
        });

        await newUser.save().catch((error) => {
          logger.error("While trying to add new user:" + error);
          return;
        });
      } else if (!user?.isGuildOwner && !user?.isAdmin) {
        user.isAdmin = true;
        user.isGuildOwner = true;

        await user.save().catch((error) => {
          logger.error("While trying to save changes to user:" + error);
          return;
        });
      }
    });

    logger.info("Guild owners permissons set");
  } catch (error) {
    logger.error("While trying to get set guild admins" + error);
  }
};
