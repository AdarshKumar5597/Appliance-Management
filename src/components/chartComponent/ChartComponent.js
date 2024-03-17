"use client";
import React from 'react'
import 'chart.js/auto';
import { Doughnut } from 'react-chartjs-2';

const ChartComponent = (props) => {
    const chartData = props.chartData;
    const options = props.options;

  return (
    <div className='h-[80%] w-[80%] relative'>
        <Doughnut data={chartData} options={options} />
        <p className="font-semibold text-lg absolute top-[50%] -translate-x-[60%] left-[50%]">{props.type}</p>
    </div>
  )
}

export default ChartComponent