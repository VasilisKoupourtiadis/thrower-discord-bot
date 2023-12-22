import { dependencies } from "../dependencies";
import mongoose from "mongoose";
import { logger } from "../../logger";

let logMessage: string = "";

export const connectToDatabase = (async () => {
  try {
    await mongoose.connect(dependencies.connectionString);
    logMessage = "Connected to database";

    console.log(logMessage);
    logger.info(logMessage);
  } catch (error) {
    logMessage = "Could not connect to db" + error;

    console.log(logMessage);
    logger.error(logMessage);
  }
})();
