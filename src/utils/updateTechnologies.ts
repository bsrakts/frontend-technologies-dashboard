import { supabase } from "@/supabaseClient";
import axios from "axios";

const fetchDownloads = async (packageName: string) => {
  const url = `https://api.npmjs.org/downloads/point/last-week/${packageName}`;
  try {
    const response = await axios.get(url);
    return response.data.downloads;
  } catch (error: any) {
    console.error(
      `Error fetching downloads for ${packageName}:`,
      error.response?.data || error.message
    );
    return 0;
  }
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
    data.map(async (tech: { npm_name: string; id: any; name: any }) => {
      try {
        const downloads = await fetchDownloads(tech.npm_name);
        const { error: updateError } = await supabase
          .from("frontend_technologies")
          .update({ weekly_downloads: downloads })
          .eq("id", tech.id);

        if (updateError) {
          console.error(`Error updating ${tech.name}:`, updateError.message);
        } else {
          console.log(
            `Successfully updated ${tech.name} with ${downloads} downloads.`
          );
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
