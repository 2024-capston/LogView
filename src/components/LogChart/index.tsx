import React, { useEffect, useState } from "react";
import "./style.css";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import { Log } from "../../interfaces";

//accessibility(Highcharts);

function LogChart() {
  const [options, setOptions] = useState({
    credits: { enabled: false },
    chart: { type: "column" },
    title: { text: "차트입니다?", align: "left" },
    yAxis: { title: { text: "Counts of Log" } },
    xAxis: { title: { text: "Hour" } },
    series: [{ data: [0] }],
  });
  var logCountByTime: number[] = [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  ];

  const logs: Log[] = [
    {
      timestamp: "13:43:54.473",
      className: "org.springframework.capstone.UserService",
      userFunction: "user.findAll()",
      query: "SELECT id, name, email FROM user",
      executionTime: "253ms",
    },
    {
      timestamp: "14:08:37.865",
      className: "org.springframework.capstone.AddressService",
      userFunction: 'address.findByZipCode("60601")',
      query:
        "SELECT id, street, city, state FROM address WHERE zip_code = '60601'",
      executionTime: "35ms",
    },
    {
      timestamp: "13:08:37.865",
      className: "org.springframework.capstone.AddressService",
      userFunction: 'address.findByZipCode("60601")',
      query:
        "SELECT id, street, city, state FROM address WHERE zip_code = '60601'",
      executionTime: "35ms",
    },
    {
      timestamp: "14:08:37.865",
      className: "org.springframework.capstone.AddressService",
      userFunction: 'address.findByZipCode("60601")',
      query:
        "SELECT id, street, city, state FROM address WHERE zip_code = '60601'",
      executionTime: "35ms",
    },
    {
      timestamp: "10:08:37.865",
      className: "org.springframework.capstone.AddressService",
      userFunction: 'address.findByZipCode("60601")',
      query:
        "SELECT id, street, city, state FROM address WHERE zip_code = '60601'",
      executionTime: "35ms",
    },
    {
      timestamp: "15:08:37.865",
      className: "org.springframework.capstone.AddressService",
      userFunction: 'address.findByZipCode("60601")',
      query:
        "SELECT id, street, city, state FROM address WHERE zip_code = '60601'",
      executionTime: "35ms",
    },
    {
      timestamp: "20:08:37.865",
      className: "org.springframework.capstone.AddressService",
      userFunction: 'address.findByZipCode("60601")',
      query:
        "SELECT id, street, city, state FROM address WHERE zip_code = '60601'",
      executionTime: "35ms",
    },
    {
      timestamp: "14:08:37.865",
      className: "org.springframework.capstone.AddressService",
      userFunction: 'address.findByZipCode("60601")',
      query:
        "SELECT id, street, city, state FROM address WHERE zip_code = '60601'",
      executionTime: "35ms",
    },
    {
      timestamp: "13:08:37.865",
      className: "org.springframework.capstone.AddressService",
      userFunction: 'address.findByZipCode("60601")',
      query:
        "SELECT id, street, city, state FROM address WHERE zip_code = '60601'",
      executionTime: "35ms",
    },
    {
      timestamp: "13:08:37.865",
      className: "org.springframework.capstone.AddressService",
      userFunction: 'address.findByZipCode("60601")',
      query:
        "SELECT id, street, city, state FROM address WHERE zip_code = '60601'",
      executionTime: "35ms",
    },
    {
      timestamp: "13:08:37.865",
      className: "org.springframework.capstone.AddressService",
      userFunction: 'address.findByZipCode("60601")',
      query:
        "SELECT id, street, city, state FROM address WHERE zip_code = '60601'",
      executionTime: "35ms",
    },
    {
      timestamp: "12:08:37.865",
      className: "org.springframework.capstone.AddressService",
      userFunction: 'address.findByZipCode("60601")',
      query:
        "SELECT id, street, city, state FROM address WHERE zip_code = '60601'",
      executionTime: "35ms",
    },
    {
      timestamp: "11:08:37.865",
      className: "org.springframework.capstone.AddressService",
      userFunction: 'address.findByZipCode("60601")',
      query:
        "SELECT id, street, city, state FROM address WHERE zip_code = '60601'",
      executionTime: "35ms",
    },
    {
      timestamp: "15:08:37.865",
      className: "org.springframework.capstone.AddressService",
      userFunction: 'address.findByZipCode("60601")',
      query:
        "SELECT id, street, city, state FROM address WHERE zip_code = '60601'",
      executionTime: "35ms",
    },
    {
      timestamp: "16:08:37.865",
      className: "org.springframework.capstone.AddressService",
      userFunction: 'address.findByZipCode("60601")',
      query:
        "SELECT id, street, city, state FROM address WHERE zip_code = '60601'",
      executionTime: "35ms",
    },
    {
      timestamp: "16:08:37.865",
      className: "org.springframework.capstone.AddressService",
      userFunction: 'address.findByZipCode("60601")',
      query:
        "SELECT id, street, city, state FROM address WHERE zip_code = '60601'",
      executionTime: "35ms",
    },
    {
      timestamp: "16:08:37.865",
      className: "org.springframework.capstone.AddressService",
      userFunction: 'address.findByZipCode("60601")',
      query:
        "SELECT id, street, city, state FROM address WHERE zip_code = '60601'",
      executionTime: "35ms",
    },
    {
      timestamp: "16:08:37.865",
      className: "org.springframework.capstone.AddressService",
      userFunction: 'address.findByZipCode("60601")',
      query:
        "SELECT id, street, city, state FROM address WHERE zip_code = '60601'",
      executionTime: "35ms",
    },
    {
      timestamp: "16:08:37.865",
      className: "org.springframework.capstone.AddressService",
      userFunction: 'address.findByZipCode("60601")',
      query:
        "SELECT id, street, city, state FROM address WHERE zip_code = '60601'",
      executionTime: "35ms",
    },
    {
      timestamp: "16:08:37.865",
      className: "org.springframework.capstone.AddressService",
      userFunction: 'address.findByZipCode("60601")',
      query:
        "SELECT id, street, city, state FROM address WHERE zip_code = '60601'",
      executionTime: "35ms",
    },
    {
      timestamp: "16:08:37.865",
      className: "org.springframework.capstone.AddressService",
      userFunction: 'address.findByZipCode("60601")',
      query:
        "SELECT id, street, city, state FROM address WHERE zip_code = '60601'",
      executionTime: "35ms",
    },
    {
      timestamp: "16:08:37.865",
      className: "org.springframework.capstone.AddressService",
      userFunction: 'address.findByZipCode("60601")',
      query:
        "SELECT id, street, city, state FROM address WHERE zip_code = '60601'",
      executionTime: "35ms",
    },
    {
      timestamp: "16:08:37.865",
      className: "org.springframework.capstone.AddressService",
      userFunction: 'address.findByZipCode("60601")',
      query:
        "SELECT id, street, city, state FROM address WHERE zip_code = '60601'",
      executionTime: "35ms",
    },
    {
      timestamp: "16:08:37.865",
      className: "org.springframework.capstone.AddressService",
      userFunction: 'address.findByZipCode("60601")',
      query:
        "SELECT id, street, city, state FROM address WHERE zip_code = '60601'",
      executionTime: "35ms",
    },
    {
      timestamp: "16:08:37.865",
      className: "org.springframework.capstone.AddressService",
      userFunction: 'address.findByZipCode("60601")',
      query:
        "SELECT id, street, city, state FROM address WHERE zip_code = '60601'",
      executionTime: "35ms",
    },
    {
      timestamp: "16:08:37.865",
      className: "org.springframework.capstone.AddressService",
      userFunction: 'address.findByZipCode("60601")',
      query:
        "SELECT id, street, city, state FROM address WHERE zip_code = '60601'",
      executionTime: "35ms",
    },
  ];
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
}

export default LogChart;
