import { dependencies } from "./bot/dependencies";
import * as fs from "fs";
import "dotenv/config";

const logToFile = (message: string) => {
  const logStream = fs.createWriteStream(dependencies.logFile, {
    flags: "a",
  });
  logStream.write(`${message}\n`);
  logStream.end();
};

export const logger = {
  info: (message: string) =>
    logToFile(`[INFO] ${message} ${new Date().toLocaleString()}`),
  error: (message: string) =>
    logToFile(`[ERROR] ${message} ${new Date().toLocaleString()}`),
};
