import React from "react";
import { Chart } from "react-google-charts";

const PieChart = (props) => {
  const data = [
    ["Human", props.humanPercent],
    ["AI", props.aiPercent],
  ];

  const options = {
    title: "Human vs AI",
  };

  return (
    <Chart chartType="PieChart" data={data} options={options} width={"100%"} height={"400px"} />
  );
};

export default PieChart;
