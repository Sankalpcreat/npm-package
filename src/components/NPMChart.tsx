// src/components/NPMChart.tsx
'use client';

import { useRef } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

type NPMChartProps = {
  data: any; 
  total: number; 
};

export default function NPMChart({ data, total }: NPMChartProps) {
  const chartRef = useRef<HTMLCanvasElement | null>(null);

  const chartData = {
    labels: data.dates,
    datasets: [
      {
        label: 'NPM Downloads',
        data: data.downloads,
        fill: true,
        borderColor: '#4CAF50', 
        backgroundColor: 'rgba(76, 175, 80, 0.2)', 
        tension: 0.4, 
      },
    ],
  };

  return (
    <div className="chart-container">
      <h2>Total Downloads: {total}</h2>
      <Line ref={chartRef} data={chartData} options={{ responsive: true }} />
    </div>
  );
}
