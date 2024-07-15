"use client";

import React, { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import Tables from "../../features/tables/Tables";
import Charts from "../../features/charts/Charts";
import { useGetTechnologiesQuery } from "../../services/api";
import { Technology } from "../../types";
import { Box } from "@mui/material";

const CategoryPage: React.FC = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [view, setView] = useState("tables");
  const category = pathname?.split("/").pop();
  const decodedCategory = decodeURIComponent(category || "").replace(/-/g, " ");
  const { data, error, isLoading } = useGetTechnologiesQuery();

  useEffect(() => {
    const viewParam = searchParams?.get("view") || "tables";
    setView(viewParam);
  }, [searchParams]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error occurred</div>;

  const filteredData: Technology[] = (data || []).filter(
    (tech: Technology) =>
      decodedCategory === "all" ||
      tech.category.toLowerCase() === decodedCategory.toLowerCase()
  );

  return (
    <Box p={2}>
      {view === "tables" ? (
        <Tables data={filteredData} />
      ) : (
        <Charts data={filteredData} />
      )}
    </Box>
  );
};

export default CategoryPage;
