import { User } from "../../models/user-schema";
import { Guild } from "../../models/guild";
import { dependencies } from "../dependencies";
import { logger } from "../../logger";

export const setSpecialGuildAdmins = async (guilds: Guild[]) => {
  try {
    const guild = guilds.find((x) => x.id === dependencies.guildId);

    const query = {
      id: [dependencies.specialAdminF, dependencies.specialAdminD],
    };

    const specialAdmins = await User.find(query);

    if (guild && specialAdmins.length < 2) {
      const specialAdminsIds: string[] = [
        dependencies.specialAdminF,
        dependencies.specialAdminD,
      ];

      specialAdmins.forEach(async (admin) => {
        if (!admin.isAdmin) {
          admin.isAdmin = true;

          await admin.save().catch((error) => {
            logger.error("While trying to save changes to user:" + error);
            return;
          });
        }

        const index = specialAdminsIds.indexOf(admin.id);
        specialAdminsIds.splice(index, 1);

        const newUser = new User({
          id: specialAdminsIds[0],
          isAdmin: true,
        });

        await newUser.save().catch((error) => {
          logger.error("While trying to add new user:" + error);
          return;
        });
      });
    } else if (guild && !specialAdmins) {
      const specialAdmins: string[] = [
        dependencies.specialAdminF,
        dependencies.specialAdminD,
      ];

      specialAdmins.forEach(async (admin) => {
        const newUser = new User({
          id: admin,
          isAdmin: true,
        });

        await newUser.save().catch((error) => {
          logger.error("While trying to add new user:" + error);
          return;
        });
      });
    } else {
      specialAdmins.forEach(async (admin) => {
        if (!admin.isAdmin) {
          admin.isAdmin = true;

          await admin.save().catch((error) => {
            logger.error("While trying to save changes to user:" + error);
            return;
          });
        }
      });
    }

    logger.info("Special guild admins set");
  } catch (error) {
    logger.error("While trying to set special guild admins" + error);
  }
};
