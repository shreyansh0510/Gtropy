import { zeroFormat } from "numeral";
import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";

function LineChart() {
  const [sevenDays, setSevenDays] = useState([]);

  useEffect(() => {
    const getData = async () => {
      await fetch("https://api.covid19india.org/data.json")
        .then((response) => response.json())
        .then((data) => {
          setSevenDays(data.cases_time_series);
        });
    };

    getData();
  }, []);

  let sample = sevenDays.slice(Math.max(sevenDays.length - 7, 0));
  console.log(sample);

  let dailyrecovered = sample.map((item) => {
    return [item.dailydeceased];
  });

  const data = {
    labels: sample.map((item, index) => {
      console.log(index);
      return [index];
    }),
    datasets: [
      {
        label: "Active",
        data: [9086, 11592, 12862, 13237, 13916, 13919, 13979],
        fill: false,
        lineTension: 0,
        backgroundColor: "rgba(255, 51, 51, 1)",
        borderColor: "rgba(255, 51, 51, 0.8)",
        borderWidth: 1,
      },
      {
        label: "Recovered",
        data: sample.map((item) => {
          return [item.dailyrecovered];
        }),
        fill: false,
        lineTension: 0,
        backgroundColor: "rgba(102, 255, 0, 1)",
        borderColor: "rgba(102, 255, 0, 0.8)",
        borderWidth: 1,
      },
      {
        label: "Deceased",
        data: [82, 99, 100, 100, 100, 89, 79],
        fill: false,
        lineTension: 0,
        backgroundColor: "rgba(189, 189, 189, 1)",
        borderColor: "rgba(189, 189, 189, 0.8)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="linechart">
      <Line
        data={data}
        options={{
          legend: {
            display: false,
          },
          scales: {
            xAxes: [
              {
                display: false,
              },
            ],
            yAxes: [
              {
                display: false,
              },
            ],
          },
        }}
      />
    </div>
  );
}

export default LineChart;
