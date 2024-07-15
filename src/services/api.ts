import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { supabase } from "../supabaseClient";
import axios from "axios";
import { Technology } from "../types";

const fetchDownloads = async (npmName: string) => {
  const url = `https://api.npmjs.org/downloads/point/last-week/${npmName}`;
  try {
    const response = await axios.get(url);
    return response.data.downloads;
  } catch (error: any) {
    console.error(
      `Error fetching downloads for ${npmName}:`,
      error.response?.data || error.message
    );
    return 0;
  }
};

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "/" }),
  endpoints: (builder) => ({
    getTechnologies: builder.query<Technology[], void>({
      async queryFn() {
        try {
          const { data, error } = await supabase
            .from("frontend_technologies")
            .select("*");
          if (error) {
            console.error("Supabase error:", error);
            return { error: { status: 500, data: error.message } };
          }

          const updatedData = await Promise.all(
            data.map(async (tech: Technology) => {
              const downloads = await fetchDownloads(tech.npm_name);
              return { ...tech, weekly_downloads: downloads };
            })
          );

          return { data: updatedData };
        } catch (error: any) {
          console.error("General error:", error);
          return { error: { status: 500, data: error.message } };
        }
      },
    }),
  }),
});

export const { useGetTechnologiesQuery } = api;
