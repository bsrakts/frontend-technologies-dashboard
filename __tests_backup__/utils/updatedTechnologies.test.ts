import { supabase } from "@/supabaseClient";
import { updateTechnologies } from "../../src/utils/updateTechnologies";

describe("updateTechnologies", () => {
  it("should update technologies with weekly downloads from npm", async () => {
    await updateTechnologies();

    const { data, error } = await supabase
      .from("frontend_technologies")
      .select("*");

    expect(error).toBeNull();
    expect(data).not.toBeNull();

    if (data) {
      data.forEach((tech) => {
        expect(tech.weekly_downloads).not.toBeNull();
        expect(tech.weekly_downloads).toBeGreaterThan(0);
      });
    }
  });
});
