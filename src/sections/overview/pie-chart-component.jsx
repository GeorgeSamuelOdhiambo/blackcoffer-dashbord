/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable consistent-return */
/* eslint-disable react/prop-types */

import React, { useRef, useEffect } from 'react';
import { Chart as ChartJS } from 'chart.js/auto';

const PieChartComponent = ({ data }) => {
  const chartRef = useRef(null);

  const processedData = data;

  useEffect(() => {
    if (chartRef && chartRef.current) {
      const chartData = {
        labels: processedData.map((entry) => entry.country),
        datasets: [
          {
            label: 'Intensity',
            data: processedData.map((entry) => entry.intensity),
            backgroundColor: 'rgba(255, 99, 132, 0.2)', // Red
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 2,
            borderDash: [5, 5],
          },
          {
            label: 'Likelihood',
            data: processedData.map((entry) => entry.likelihood),
            backgroundColor: 'rgba(54, 162, 235, 0.2)', // Blue
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 2,
            borderDash: [5, 5],
          },
          {
            label: 'Relevance',
            data: processedData.map((entry) => entry.relevance),
            backgroundColor: 'rgba(75, 192, 192, 0.6)',
            borderColor: 'rgba(75, 192, 192, 0.6)',
            borderWidth: 2,
            borderDash: [5, 5],
          },
        ],
      };

      const myChart = new ChartJS(chartRef.current, {
        type: `line`,
        data: chartData,
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
          plugins: {
            tooltip: {
              callbacks: {
                label(context) {
                  const label = context.dataset.label || '';
                  if (label) {
                    return `${label}: ${context.parsed.y}`;
                  }
                  return null;
                },
                afterLabel(context) {
                  const index = context.dataIndex;
                  return `Country: ${processedData[index].country}\n EndYear: ${processedData[index].end_year}\n Topic: ${processedData[index].topic}\n City: ${processedData[index].city}`;
                },
              },
            },
          },
        },
      });

      return () => myChart.destroy();
    }
  }, [processedData]);

  return <canvas ref={chartRef} />;
};

export default PieChartComponent;
