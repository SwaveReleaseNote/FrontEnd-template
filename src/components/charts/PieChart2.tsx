import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';
import axios from 'axios';

type LabelNum = {
  label: string;
  num: number;
};

type Props = {
  projectId: {
    id: number;
  };
};

const PieChart: React.FC<Props> = ({ projectId }) => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart<'pie'> | null>(null);

  useEffect(() => {
    console.log('PieChart Project id:', projectId.id);
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `/api/project/dashboard/pieChart/${projectId.id}`,
        );
        const data: LabelNum[] = response.data;
        renderChart(data);
      } catch (error) {
        console.error('Error fetching project Pie Chart:', error);
        console.log('Mocking data');

        const mockResponse: LabelNum[] = [
          { label: 'update', num: 2 },
          { label: 'delete', num: 4 },
          { label: 'bugfix', num: 5 },
          { label: 'new', num: 1 },
          { label: 'stop', num: 7 },
        ];

        renderChart(mockResponse);
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
        update: 'rgb(232, 239, 151)',
        delete: 'rgb(164, 101, 241)',
        bugfix: 'rgb(101, 143, 241)',
        new: 'rgb(51, 255, 148)',
        stop: 'rgb(255, 125, 156)',
      };

      const backgroundColor = labels.map((label) => colorMapping[label]);

      chartInstance.current = new Chart(chartRef.current, {
        type: 'pie',
        data: {
          labels,
          datasets: [
            {
              label: 'Release Note',
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

  return <canvas ref={chartRef}></canvas>;
};

export default PieChart;
