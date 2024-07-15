import axios from "axios";
import { supabase } from "../supabaseClient";

const fetchDownloads = async (packageName: string) => {
  const url = `https://api.npmjs.org/downloads/point/last-week/${packageName}`;
  const response = await axios.get(url);
  return response.data.downloads;
};

export const updateTechnologies = async () => {
  const { data, error } = await supabase
    .from("frontend_technologies")
    .select("*");
  if (error) {
    console.error("Error fetching technologies:", error.message);
    return;
  }

  const updatedData = await Promise.all(
    data.map(async (tech) => {
      try {
        const downloads = await fetchDownloads(tech.name);
        const { error: updateError } = await supabase
          .from("frontend_technologies")
          .update({ weekly_downloads: downloads })
          .eq("id", tech.id);

        if (updateError) {
          console.error(`Error updating ${tech.name}:`, updateError.message);
        }

        return { ...tech, weekly_downloads: downloads };
      } catch (err: any) {
        console.error(
          `Error fetching downloads for ${tech.name}:`,
          err.message
        );
        return tech;
      }
    })
  );

  console.log("Technologies updated successfully.");
};
