import React, { useEffect, useState } from "react";
import "./style.css";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import { Log } from "../../interfaces";

interface LogChartProps {
    logs: Log[];
}

const LogChart: React.FC<LogChartProps> = ({ logs }) => {
    const [options, setOptions] = useState({
        credits: { enabled: false },
        chart: { type: "column" },
        title: { text: "차트입니다?", align: "left" },
        yAxis: { title: { text: "Counts of Log" } },
        xAxis: { title: { text: "Hour" } },
        series: [{ data: [0] }],
    });
    var logCountByTime: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

    logs.map((log) => {
        const time: number = Number(log.timestamp.substring(0, 2));
        logCountByTime[time]++;
    });

    useEffect(() => {
        setOptions({ ...options, series: [{ data: logCountByTime }] });

        console.log(logCountByTime);
    }, []);

    return (
        <>
            <div id="chart-container">
                <HighchartsReact highcharts={Highcharts} options={options} />
            </div>
        </>
    );
};

export default LogChart;
