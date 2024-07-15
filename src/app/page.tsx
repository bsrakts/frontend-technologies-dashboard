"use client";

import React from "react";
import { useGetTechnologiesQuery } from "../services/api";
import Tables from "../features/tables/Tables";
import { Technology } from "../types";

const HomePage: React.FC = () => {
  const { data, error, isLoading } = useGetTechnologiesQuery();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error occurred</div>;

  return (
    <div>
      <h1 className="font-mono text-gray-900 mb-6 text-center">
        What is the best technology in the front-end ecosystem?
      </h1>
      <Tables data={data || []} />
    </div>
  );
};

export default HomePage;
