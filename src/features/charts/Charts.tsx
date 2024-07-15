import React, { useState, useEffect } from "react";
import ApexChart from "react-apexcharts";
import { Technology } from "../../types";

interface ChartsProps {
  data: Technology[];
}

const Charts: React.FC<ChartsProps> = ({ data }) => {
  const [names, setNames] = useState<string[]>([]);
  const [downloads, setDownloads] = useState<number[]>([]);
  const [isDataReady, setIsDataReady] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (data && data.length > 0) {
        const filteredData = data
          .filter(
            (tech) =>
              tech.weekly_downloads !== null &&
              tech.weekly_downloads !== undefined &&
              tech.name !== null &&
              tech.name !== undefined
          )
          .sort((a, b) => b.weekly_downloads - a.weekly_downloads);

        const slicedData = filteredData.slice(
          0,
          Math.min(10, filteredData.length)
        );

        const newNames = slicedData.map((tech) => tech.name);
        const newDownloads = slicedData.map((tech) => tech.weekly_downloads);

        setNames(newNames);
        setDownloads(newDownloads);
        setTimeout(() => setIsDataReady(true), 0);
      }
    };

    fetchData();
  }, [data]);

  if (!isDataReady) {
    return <div>Loading charts...</div>;
  } else {
    return (
      <div>
        <ApexChart
          options={{
            chart: { type: "donut" },
            labels: names,
          }}
          series={downloads}
          type="donut"
          height={350}
        />
        <ApexChart
          options={{
            chart: { type: "bar" },
            xaxis: { categories: names },
          }}
          series={[{ name: "Weekly Downloads", data: downloads }]}
          type="bar"
          height={350}
        />
      </div>
    );
  }
};

export default Charts;
