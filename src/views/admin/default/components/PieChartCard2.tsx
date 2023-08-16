/*eslint-disable*/
import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';
import LoadingComponent from './LoadingComponent ';
import api from 'context/api';
import { useQuery } from 'react-query';

interface LabelNum {
   label: string;
   count: number;
}

interface Props {
   projectId: {
      id: number;
   };
}

const PieChartCard: React.FC<Props> = ({ projectId }) => {
   const chartRef = useRef<HTMLCanvasElement>(null);
   const chartInstance = useRef<Chart<'pie'> | null>(null);
   const [dataCount, setDataCount] = useState(0);
   const [isRenderChart, setIsRenderChart] = useState(false);

   const fetchChartData = async (): Promise<LabelNum[]> => {
      try {
         const response = await api.get(`project/${projectId.id}/release-note/label/count`);
         return response.data;
      } catch (error) {
         console.error('Error fetching project Pie Chart:', error);
         return mockFectchPieChart();
      }
   };

   const mockFectchPieChart = (): LabelNum[] => {
      // Simulate API response with mock data
      const mockResponse: LabelNum[] = [
         { label: 'update', count: 2 },
         { label: 'delete', count: 4 },
         { label: 'etc', count: 5 },
         { label: 'new', count: 1 },
         { label: 'stop', count: 2 },
      ];

      return mockResponse;
   };

   const chartData = useQuery<LabelNum[]>(['pieChartData', projectId], fetchChartData);

   useEffect(() => {
      if (chartData.isSuccess) {
            renderChart(chartData.data);
            setDataCount(chartData.data.reduce((total, item) => total + item.count, 0));
      }
   }, [chartData.isSuccess, isRenderChart]);

   const renderChart = (data: LabelNum[]): void => {
      try {
         if (chartRef.current != null) {
            if (chartInstance.current != null) {
               chartInstance.current.destroy();
            }

            const labels = data.map(item => item.label);
            const numbers = data.map(item => item.count);
            const colorMapping: Record<string, string> = {
               update: 'rgb(232, 239, 151)',
               delete: 'rgb(164, 101, 241)',
               bugfix: 'rgb(101, 143, 241)',
               new: 'rgb(51, 255, 148)',
               stop: 'rgb(255, 125, 156)',
            };

            const backgroundColor = labels.map(label => colorMapping[label]);

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
      } finally {
         setIsRenderChart(true);
      }
   };

   return (
      <div
         className={`overflow-hidden !z-5 relative flex h-full w-full flex-col items-center justify-center rounded-[20px] bg-white bg-clip-border px-6 pb-6 shadow-3xl shadow-shadow-500 dark:!bg-navy-800 dark:text-white dark:shadow-none`}>
         <div className="relative flex items-center justify-between pt-4">
            <div className="text-xl font-bold text-navy-700 dark:text-white">Pie Chart</div>
         </div>
         {isRenderChart ? (
            <div className="mb-auto mt-auto flex h-[30vh] w-[30vh] items-center justify-center">
               {dataCount <= 0 ? (
                  <div className="text-black-400 flex h-full w-full items-center justify-center gap-10 text-xl font-bold dark:text-white">
                     생성된 릴리즈노트가 없습니다!!👻
                  </div>
               ) : (
                  <canvas className="mt-4" ref={chartRef}></canvas>
               )}
            </div>
         ) : (
            <LoadingComponent fontSize="m" />
         )}
         <div className="justify-between rounded-2xl px-6 py-3 shadow-2xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
            <div className="flex flex-col items-center justify-center">
               <div className="flex items-center justify-center">
                  <p className="ml-1 mt-4 text-xl font-normal text-gray-600">Release Note</p>
               </div>
               <p className="mt-px text-xl font-bold text-navy-700 dark:text-white">{dataCount}</p>
            </div>
         </div>
      </div>
   );
};

export default PieChartCard;
