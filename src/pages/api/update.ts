import type { NextApiRequest, NextApiResponse } from "next";
import { updateTechnologies } from "../../utils/updateTechnologies";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await updateTechnologies();
    res
      .status(200)
      .json({ message: "Technologies updated successfully from npm api." });
  } catch (error) {
    res
      .status(500)
      .json({
        error: "Failed to update technologies when request to npm api.",
      });
  }
}
