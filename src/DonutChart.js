import React from "react";
import Chart from "chart.js";
import { Doughnut } from "react-chartjs-2";

function DonutChart({ confirmed, active, recovered, deaths }) {
  const data = {
    labels: ["Active", "Deceased", "Recovered"],
    datasets: [
      {
        label: "Active",
        data: [active, recovered, deaths],
        borderColor: "rgba(255,255,255)",
        borderWidth: 3,
        backgroundColor: [
          "rgba(0, 129, 204, 0.822)",
          "rgb(0, 190, 0)",
          "rgb(128,128,128)",
        ],
      },
    ],
  };

  return (
    <div className="donutchart">
      <Doughnut
        type="doughnut"
        data={data}
        options={{
          responsive: true,
          legend: {
            display: true,
            position: "right",
            align: "center",
            fullWidth: "true",
            labels: {
              usePointStyle: true,
            },
          },
          cutoutPercentage: 85,
        }}
      />
    </div>
  );
}

export default DonutChart;
