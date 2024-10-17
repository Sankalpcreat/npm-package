"use client";

import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler } from 'chart.js';
import React from 'react';

// Register necessary elements and the Filler plugin for the area effect
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

interface ChartProps {
  downloads: Array<{ day: string; downloads: number }>;
}

// Helper function to group downloads by month and calculate monthly totals
const calculateMonthlyDownloads = (downloads: Array<{ day: string; downloads: number }>) => {
  const monthlyDownloads: { [key: string]: number } = {};

  // Grouping the downloads by month (key: "YYYY-MM")
  downloads.forEach((entry) => {
    const month = entry.day.slice(0, 7); // Extracting the "YYYY-MM" part from the date string
    if (!monthlyDownloads[month]) {
      monthlyDownloads[month] = 0;
    }
    monthlyDownloads[month] += entry.downloads; // Accumulating the downloads for each month
  });

  // Converting the object into an array of { month, downloads }
  return Object.entries(monthlyDownloads).map(([month, downloads]) => ({
    month,
    downloads,
  }));
};

// Format large numbers as "M" for millions
const formatYAxisLabel = (value: number) => {
  if (value >= 1000000) {
    return (value / 1000000).toFixed(1) + 'M'; // Format as "M" for millions
  }
  return value;
};

const Chart = ({ downloads }: ChartProps) => {
  // Calculate monthly downloads
  const monthlyDownloads = calculateMonthlyDownloads(downloads);

  const data = {
    labels: monthlyDownloads.map((entry) => entry.month), // Month as labels
    datasets: [
      {
        label: 'Monthly Downloads',
        data: monthlyDownloads.map((entry) => entry.downloads), // Monthly downloads as data
        fill: true, // Enables the area filling effect
        borderColor: '#9f7aea',
        backgroundColor: 'rgba(159, 122, 234, 0.4)', // Color of the filled area
        tension: 0.4, // Optional: smoothens the line
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      title: {
        display: true,
        text: 'Monthly Downloads Over Time',
      },
    },
    scales: {
      x: {
        type: 'category', // Category scale for the x-axis
        title: {
          display: true,
          text: 'Month',
        },
      },
      y: {
        type: 'linear', // Linear scale for the y-axis
        title: {
          display: true,
          text: 'Monthly Downloads',
        },
        ticks: {
          callback: (value: any) => formatYAxisLabel(value), // Format y-axis ticks
        },
      },
    },
  };

  return <Line data={data} options={options} />;
};

export default Chart;
