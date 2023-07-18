import Card from "components/card";
import React, { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";
import axios from "axios";

type LabelNum = {
  label: string;
  num: number;
};

type Props = {
  projectId: {
    id: number;
  };
};

const PieChartCard: React.FC<Props> = ({ projectId }) => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart<"pie"> | null>(null);
  const [dataCount, setDataCount] = useState(0);

  useEffect(() => {
    console.log("PieChart Project id:", projectId.id);
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `/api/project/dashboard/pieChart/${projectId.id}`
        );
        const data: LabelNum[] = response.data;
        renderChart(data);
        setDataCount(data.reduce((total, item) => total + item.num, 0));
      } catch (error) {
        console.error("Error fetching project Pie Chart:", error);
        console.log("Mocking data");

        const mockResponse: LabelNum[] = [
          { label: "update", num: 2 },
          { label: "delete", num: 4 },
          { label: "bugfix", num: 5 },
          { label: "new", num: 1 },
          { label: "stop", num: 7 },
        ];

        renderChart(mockResponse);
        setDataCount(mockResponse.reduce((total, item) => total + item.num, 0));
      }
    };

    fetchData();
  }, [projectId]);

  const renderChart = (data: LabelNum[]) => {
    if (chartRef.current) {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      const labels = data.map((item) => item.label);
      const numbers = data.map((item) => item.num);
      const colorMapping: { [label: string]: string } = {
        update: "rgb(232, 239, 151)",
        delete: "rgb(164, 101, 241)",
        bugfix: "rgb(101, 143, 241)",
        new: "rgb(51, 255, 148)",
        stop: "rgb(255, 125, 156)",
      };

      const backgroundColor = labels.map((label) => colorMapping[label]);

      chartInstance.current = new Chart(chartRef.current, {
        type: "pie",
        data: {
          labels,
          datasets: [
            {
              label: "Release Note",
              data: numbers,
              backgroundColor,
              hoverOffset: 4,
            },
          ],
        },
        options: {},
      });
    }
  };

  return (
    <div
      className={`!z-5 relative flex h-full w-full flex-col rounded-[20px] bg-white bg-clip-border px-6 pb-6 shadow-3xl shadow-shadow-500 dark:!bg-navy-800 dark:text-white dark:shadow-none sm:overflow-x-auto`}
    >
      <div className="relative flex items-center justify-between pt-4">
        <div className="text-xl font-bold text-navy-700 dark:text-white">
          Pie Chart
        </div>
      </div>

      <div className="mb-auto mt-auto flex h-[220px] w-full items-center justify-center">
        <canvas className="mt-4" ref={chartRef}></canvas>
      </div>
      <div className="justify-between rounded-2xl px-6 py-3 shadow-2xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
        <div className="flex flex-col items-center justify-center">
          <div className="flex items-center justify-center">
            <p className="mt-4 ml-1 text-xl font-normal text-gray-600">
              Release Note
            </p>
          </div>
          <p className="mt-px text-xl font-bold text-navy-700 dark:text-white">
            {dataCount}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PieChartCard;
