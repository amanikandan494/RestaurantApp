// components/PieChart.tsx
import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import { ChartData, ChartOptions } from "chart.js";

interface PieChartProps {
  data: number[];
  labels: string[];
  backgroundColors?: string[];
}

const PieChart: React.FC<PieChartProps> = ({
  data,
  labels,
  backgroundColors,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const chartRef = useRef<Chart<"pie"> | null>(null); // Keep a reference to the chart instance
  console.log("The data in pie chart:", data);
  useEffect(() => {
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext("2d");

      if (ctx) {
        // Destroy existing chart instance if it exists
        if (chartRef.current) {
          chartRef.current.destroy();
        }

        chartRef.current = new Chart(ctx, {
          type: "pie",
          data: {
            labels,
            datasets: [
              {
                data,
                backgroundColor: backgroundColors || [
                  "rgba(255, 99, 132, 0.6)",
                  "rgba(54, 162, 235, 0.6)",
                  "rgba(255, 206, 86, 0.6)",
                  "rgba(75, 192, 192, 0.6)",
                  "rgba(153, 102, 255, 0.6)",
                  "rgba(255, 159, 64, 0.6)",
                ],
                borderColor: [
                  "rgba(255, 99, 132, 1)",
                  "rgba(54, 162, 235, 1)",
                  "rgba(255, 206, 86, 1)",
                  "rgba(75, 192, 192, 1)",
                  "rgba(153, 102, 255, 1)",
                  "rgba(255, 159, 64, 1)",
                ],
                borderWidth: 1,
              },
            ],
          },
          options: {
            responsive: true,
            plugins: {
              legend: {
                display: true,
                position: "top",
              },
              tooltip: {
                enabled: true,
              },
            },
          } as ChartOptions<"pie">,
        });
      }
    }
    // Cleanup on component unmount
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, [data, labels, backgroundColors]); // Include backgroundColors in the dependency array if it affects the chart

  return (
    <div className="piechart-container">
      <canvas ref={canvasRef}></canvas>
    </div>
  );
};

export default PieChart;
