"use client";
import React from 'react'
import 'chart.js/auto';
import { Doughnut } from 'react-chartjs-2';

const ChartComponent = (props) => {
    const chartData = props.chartData;
    const options = props.options;

  return (
    <div className='h-[80%] w-[80%]'>
        <Doughnut data={chartData} options={options} />
    </div>
  )
}

export default ChartComponent