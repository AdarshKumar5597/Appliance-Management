import React from "react";
import styles from "./statistics.module.css";
import Image from "next/image";
import ChartComponent from "@/components/chartComponent/ChartComponent";
import { getApplianceStatus } from "@/lib/data";
import { auth } from "@/lib/auth";
import { getHistory } from "@/lib/action";

const StatsPage = async () => {
  const session = await auth();

  const status = await getApplianceStatus();

  const histories = await getHistory();

  if (status) {
    console.log("Status: ", status);
  }

  var xValues = ["ON", "OFF"];

  var barColors = ["#4CAF50", "#FF0000"];

  var yFanValues = [(status?.fan / 5) * 100, 100 - (status?.fan / 5) * 100];

  var yBulbValues = [status?.bulb * 100, 100 - status?.bulb * 100];

  var yLedValues = [100, 0];

  var yAcValues = [status?.ac.temp, 100 - status?.ac.temp];

  const options = {
    legend: {
      display: false,
      position: "right",
    },
    elements: {
      arc: {
        borderWidth: 0,
      },
    },
  };

  const fanChartData = {
    maintainAspectRatio: false,
    responsive: false,
    labels: xValues,
    datasets: [
      {
        data: yFanValues,
        backgroundColor: barColors,
        hoverBackgroundColor: barColors,
      },
    ],
  };
  const bulbChartData = {
    maintainAspectRatio: false,
    responsive: false,
    labels: xValues,
    datasets: [
      {
        data: yBulbValues,
        backgroundColor: barColors,
        hoverBackgroundColor: barColors,
      },
    ],
  };
  const ledChartData = {
    maintainAspectRatio: false,
    responsive: false,
    labels: xValues,
    datasets: [
      {
        data: yLedValues,
        backgroundColor: barColors,
        hoverBackgroundColor: barColors,
      },
    ],
  };
  const acChartData = {
    maintainAspectRatio: false,
    responsive: false,
    labels: xValues,
    datasets: [
      {
        data: yAcValues,
        backgroundColor: barColors,
        hoverBackgroundColor: barColors,
      },
    ],
  };

  return (
    <div className="flex flex-col gap-5 p-5 h-[calc(100vh-200px)] w-full lg:overflow-hidden md:overflow-y-scroll sm:overflow-y-scroll">
      <div className="flex-1 flex w-full p-3 lg:flex lg:flex-row gap-3 md:flex md:flex-col sm:flex sm:flex-col xs:flex xs:flex-col">
        <div
          className={`w-[25%] rounded-xl ${styles.glassCard} flex p-2 gap-7 justify-center items-center lg:w-[25%] md:w-[100%] sm:w-[100%] sm:justify-center sm:items-center sm:rounded-xl sm:p-2 sm:glassCard    xs:w-[100%] xs:justify-center xs:items-center xs:rounded-xl xs:p-2 sm:glassCard`}
        >
          <div className="w-[50%] flex justify-end">
            <Image src="/fan.png" alt="brands-png" width={125} height={125} />
          </div>
          <div className="flex flex-col center items-start w-[50%]">
            <h1 className="text-3xl font-bold text-white">Fan</h1>
            <p className="font-semibold text-lg">
              {status?.fan === 0 ? "Off" : "On"}
            </p>
          </div>
        </div>

        <div
          className={`w-[25%] rounded-xl ${styles.glassCard} flex p-2 gap-7 justify-center items-center lg:w-[25%] md:w-[100%] sm:w-[100%] sm:justify-center sm:items-center sm:rounded-xl sm:p-2 sm:glassCard    xs:w-[100%] xs:justify-center xs:items-center xs:rounded-xl xs:p-2 sm:glassCard`}
        >
          <div className="w-[50%] flex justify-end">
            <Image src="/bulb.png" alt="brands-png" width={125} height={125} />
          </div>
          <div className="flex flex-col center items-start w-[50%]">
            <h1 className="text-3xl font-bold text-white">Bulb</h1>
            <p className="font-semibold text-lg">
              {status?.bulb === 0 ? "Off" : "On"}
            </p>
          </div>
        </div>

        <div
          className={`w-[25%] rounded-xl ${styles.glassCard} flex p-2 gap-7 justify-center items-center lg:w-[25%] md:w-[100%] sm:w-[100%] sm:justify-center sm:items-center sm:rounded-xl sm:p-2 sm:glassCard    xs:w-[100%] xs:justify-center xs:items-center xs:rounded-xl xs:p-2 sm:glassCard`}
        >
          <div className="w-[50%] flex justify-end">
            <Image
              src="/lightbulb.png"
              alt="brands-png"
              width={125}
              height={125}
            />
          </div>
          <div className="flex flex-col center items-start w-[50%]">
            <h1 className="text-3xl font-bold text-white">LED</h1>
            {console.log("Status: ", status?.led.split("'").join(""))}
            <div
              className={`h-[20px] w-[80px]`}
              style={{ backgroundColor: status?.led.split("'").join("") }}
            ></div>
          </div>
        </div>

        <div
          className={`w-[25%] rounded-xl ${styles.glassCard} flex p-2 gap-7 justify-center items-center lg:w-[25%] md:w-[100%] sm:w-[100%] sm:justify-center sm:items-center sm:rounded-xl sm:p-2 sm:glassCard    xs:w-[100%] xs:justify-center xs:items-center xs:rounded-xl xs:p-2 sm:glassCard`}
        >
          <div className="w-[50%] flex justify-end">
            <Image src="/ac.png" alt="brands-png" width={125} height={125} />
          </div>
          <div className="flex flex-col center items-start w-[50%]">
            <h1 className="text-3xl font-bold text-white">AC</h1>
            <p className="font-semibold text-lg">
              {status?.ac.state === 0 ? "Off" : "On"}
            </p>
            <p className="font-semibold text-lg">
              {status?.ac.state === 1 && status?.ac.temp + "%"}
            </p>
          </div>
        </div>
      </div>

      <div
        className={`flex-2 flex w-full p-3 gap-3 flex-row taskChartContainer ${styles.taskChartContainer}`}
      >
        <div
          className={`lg:w-[67%] rounded-xl ${styles.glassCard} flex flex-col gap-2 p-3 overflow-y-scroll max-h-[420px] md:w-[100%] sm:w-[100%]`}
        >
          <h1 className="text-3xl font-bold text-white w-full flex items-center justify-center p-2">
            History
          </h1>
          {histories?.map((history, index) => {
            return (
              <div
                key={index}
                className={`w-full border-[1px] border-white/15 flex rounded-xl h-[10vh] justify-between p-10 items-center`}
              >
                <h1 className="text-lg font-bold flex justify-start items-center text-white w-[30%]">
                  {history.username}
                </h1>
                <h1 className="text-lg font-bold flex justify-start items-center text-white w-[30%]">
                  {history.appliance}
                </h1>
                <p className="text-white w-[30%] flex justify-start items-center">
                  {history.value}
                </p>
                <p className="text-white w-[30%] flex justify-start items-center">
                  {history.createdAt.toString().substring(0, 10)}
                </p>
                <div
                  className={`w-[10px] h-[10px] rounded-full ${
                    history?.success === false ? "bg-red-600" : "bg-green-500"
                  } shadow-sm shadow-red-400`}
                ></div>
              </div>
            );
          })}
        </div>
        <div
          className={`lg:w-[33%] rounded-xl ${styles.glassCard} flex flex-col items-center h-[420px] overflow-y-scroll max-h-[420px] sm:w-[100%] md:w-[100%]`}
        >
          <div className="h-[40px] w-full"></div>
          <ChartComponent
            type={"FAN"}
            chartData={fanChartData}
            options={options}
          />
          <ChartComponent
            type={"BULB"}
            chartData={bulbChartData}
            options={options}
          />
          <ChartComponent
            type={"LED"}
            chartData={ledChartData}
            options={options}
          />
          { status?.ac.state === 1 &&
            <ChartComponent
              type={"AC"}
              chartData={acChartData}
              options={options}
            />
          }
        </div>
      </div>
    </div>
  );
};

export default StatsPage;
