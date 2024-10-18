"use client";

import { useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import React from "react";

// Register necessary elements and the Filler plugin for the area effect
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface ChartProps {
  downloads: Array<{ day: string; downloads: number }>;
  releaseDate:Date;
}

// Helper function to group downloads by month and calculate monthly totals
const calculateMonthlyDownloads = (
  downloads: Array<{ day: string; downloads: number }>
) => {
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

// Helper function to group downloads by week and calculate weekly totals
const calculateWeeklyDownloads = (
  downloads: Array<{ day: string; downloads: number }>
) => {
  const weeklyDownloads: { [key: string]: number } = {};

  // Grouping the downloads by week (key: "YYYY-Ww", where "w" is the week number)
  downloads.forEach((entry) => {
    const date = new Date(entry.day);
    const year = date.getFullYear();
    const week = Math.ceil(
      (date.getDate() - date.getDay() + 1) / 7
    ); // Week number calculation
    const weekKey = `${year}-W${week}`; // Format: "YYYY-Ww"
    if (!weeklyDownloads[weekKey]) {
      weeklyDownloads[weekKey] = 0;
    }
    weeklyDownloads[weekKey] += entry.downloads; // Accumulating the downloads for each week
  });

  // Converting the object into an array of { week, downloads }
  return Object.entries(weeklyDownloads).map(([week, downloads]) => ({
    week,
    downloads,
  }));
};

// Format large numbers as "M" for millions
const formatYAxisLabel = (value: number) => {
  if (value >= 1000000) {
    return (value / 1000000).toFixed(1) + "M"; // Format as "M" for millions
  }
  return value;
};

const Chart = ({ downloads }: ChartProps) => {
  const [viewMode, setViewMode] = useState<"monthly" | "weekly">("monthly");

  // Calculate downloads based on the selected view mode (monthly or weekly)
  const chartData = viewMode === "monthly"
    ? calculateMonthlyDownloads(downloads)
    : calculateWeeklyDownloads(downloads);

  const data = {
    labels: chartData.map((entry) =>
      viewMode === "monthly" ? (entry as { month: string }).month : (entry as { week: string }).week
    ), // Display month or week as labels
    datasets: [
      {
        label: `${viewMode.charAt(0).toUpperCase() + viewMode.slice(1)} Downloads`,
        data: chartData.map((entry) => entry.downloads), // Download data for the selected period
        fill: true, // Enables the area filling effect
        borderColor: "#9f7aea",
        backgroundColor: "rgba(159, 122, 234, 0.4)", // Color of the filled area
        tension: 0.4, // Optional: smoothens the line
      },
    ],
  };
  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "top" as const, // Ensures 'top' is treated as a valid position
        labels: {
          font: {
            size: 14, // Increase font size for the legend
          },
        },
      },
      title: {
        display: true,
        text: `${viewMode.charAt(0).toUpperCase() + viewMode.slice(1)} Downloads Over Time`,
        font: {
          size: 18, // Increase font size for the title
        },
      },
    },
    scales: {
      x: {
        type: "category" as const, // Explicitly define the type for category scale
        title: {
          display: true,
          text: viewMode === "monthly" ? "Month" : "Week", // Update axis title based on view mode
          font: {
            size: 16, // Increase font size for x-axis title
          },
        },
        ticks: {
          font: {
            size: 12, // Increase font size for x-axis labels
          },
        },
      },
      y: {
        type: "linear" as const, // Use "linear" for numeric data (download counts)
        title: {
          display: true,
          text: `${viewMode.charAt(0).toUpperCase() + viewMode.slice(1)} Downloads`,
          font: {
            size: 16, // Increase font size for y-axis title
          },
        },
        ticks: {
          callback: (value: number | string) => formatYAxisLabel(Number(value)), // Format y-axis ticks
          font: {
            size: 12, // Increase font size for y-axis labels
          },
        },
      },
    },
  };

  return (

      <div className="w-full mb-7 max-w-4xl bg-gray-900 bg-opacity-70 backdrop-blur-lg rounded-xl shadow-2xl p-8 space-y-6 border border-gray-800">
        <div className="text-center space-y-2">
          <h1 className="text-5xl font-bold text-gray-100">NPM Downloads</h1>
          <p className="text-lg text-gray-400">
            View {viewMode} downloads over time for a package.
          </p>
        </div>
        <div className="flex justify-center space-x-4 mb-6">
          <button
            className={`px-6 py-3 text-lg font-semibold rounded-md ${
              viewMode === "monthly"
                ? "bg-purple-600 text-white"
                : "bg-gray-700 text-gray-300"
            }`}
            onClick={() => setViewMode("monthly")}
          >
            Monthly
          </button>
          <button
            className={`px-6 py-3 text-lg font-semibold rounded-md ${
              viewMode === "weekly"
                ? "bg-purple-600 text-white"
                : "bg-gray-700 text-gray-300"
            }`}
            onClick={() => setViewMode("weekly")}
          >
            Weekly
          </button>
        </div>
        <div className="w-full h-[500px]">
          <Line data={data} options={options} />
        </div>
      </div>
   
  );
};

export default Chart;
