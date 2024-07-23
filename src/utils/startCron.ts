import cron from "node-cron";
import { updateTechnologies } from "./updateTechnologies";

export const startCron = () => {
  cron.schedule("0 0 * * *", async () => {
    console.log("Updating technologies...");
    await updateTechnologies();
  });
};
