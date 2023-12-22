import { registerCommands } from "../commands/register-commands";
import { setGuildOwners } from "../../database/set-guild-owners";
import { setSpecialGuildAdmins } from "../../database/set-special-guild-admins";
import { Guild } from "../../models/guild";
import { Client, ActivityType } from "discord.js";
import { logger } from "../../logger";

let logMessage: string = "";

export const clientOnReady = async (client: Client) => {
  logMessage = `${client.user?.username} is online`;

  console.log(logMessage);
  logger.info(logMessage);

  const guilds: Guild[] = [];

  client.guilds.cache.map((g) => {
    const guild: Guild = {
      id: g.id,
      owner: g.ownerId,
    };
    guilds.push(guild);
  });

  await registerCommands(guilds);
  await setGuildOwners(guilds);
  await setSpecialGuildAdmins(guilds);

  client.user?.setActivity({
    name: "Daco throw",
    type: ActivityType.Watching,
  });
};
