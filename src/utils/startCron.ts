import cron from "node-cron";
import { updateTechnologies } from "./updateTechnologies";

cron.schedule("0 0 * * *", async () => {
  console.log("Updating technologies...");
  await updateTechnologies();
});
