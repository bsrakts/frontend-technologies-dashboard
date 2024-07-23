import cron from "node-cron";
import { startCron } from "../../src/utils/startCron";
import { updateTechnologies } from "../../src/utils/updateTechnologies";

jest.mock("node-cron", () => ({
  schedule: jest.fn(),
}));

jest.mock("../../src/utils/updateTechnologies", () => ({
  updateTechnologies: jest.fn(),
}));

describe("startCron", () => {
  it("should schedule a cron job to update technologies", () => {
    startCron();

    expect(cron.schedule).toHaveBeenCalledWith(
      "0 0 * * *",
      expect.any(Function)
    );

    const cronJobCallback = (cron.schedule as jest.Mock).mock.calls[0][1];

    cronJobCallback();
    expect(updateTechnologies).toHaveBeenCalled();
  });
});
