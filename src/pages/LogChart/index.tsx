import React, { useState } from "react";
import "./style.css";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";

//accessibility(Highcharts);

function LogChart() {
  const [options, setOptions] = useState({
    chart: { type: "spline" },
    title: { text: "차트입니다?", align: "left" },
    series: [{ data: [1, 2, 1, 4, 3, 6] }],
  });

  //Highcharts.chart("chart-container", {});

  return (
    <>
      <div id="chart-container">
        <HighchartsReact highcharts={Highcharts} options={options} />
      </div>
    </>
  );
}

export default LogChart;
