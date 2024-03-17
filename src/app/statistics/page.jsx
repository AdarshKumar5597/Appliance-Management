import React from "react";
import styles from "./statistics.module.css";
import Image from "next/image";
import ChartComponent from "@/components/chartComponent/ChartComponent";
import { getTasks, getUsers } from "@/lib/data";
import { auth } from "@/lib/auth";

const StatsPage = async () => {
  const session = await auth();
  const users = session ? await getUsers() : [];
  const tasks = session ? await getTasks() : [];
  console.log("Users: ", users, "Tasks: ", tasks);

  const assignedTasksLength = tasks?.filter(
    (task) => task.status === "assigned"
  ).length;
  const completedTasksLength = tasks?.filter(
    (task) => task.status === "completed"
  ).length;

  var xValues = ["Assigned", "Completed"];

  var barColors = ["#FF0000", "#02AAF1"];

  var yValues = [
    (assignedTasksLength / (assignedTasksLength + completedTasksLength)) * 100,
    (completedTasksLength / (assignedTasksLength + completedTasksLength)) * 100,
  ];

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

  const chartData = {
    maintainAspectRatio: false,
    responsive: false,
    labels: xValues,
    datasets: [
      {
        data: yValues,
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
            <Image src="/users.png" alt="brands-png" width={125} height={125} />
          </div>
          <div className="flex flex-col center items-start w-[50%]">
            <h1 className="text-3xl font-bold text-white">Users</h1>
            <p className="font-semibold text-lg">{users?.length}</p>
          </div>
        </div>

        <div
          className={`w-[25%] rounded-xl ${styles.glassCard} flex p-2 gap-7 justify-center items-center lg:w-[25%] md:w-[100%] sm:w-[100%] sm:justify-center sm:items-center sm:rounded-xl sm:p-2 sm:glassCard    xs:w-[100%] xs:justify-center xs:items-center xs:rounded-xl xs:p-2 sm:glassCard`}
        >
          <div className="w-[50%] flex justify-end">
            <Image src="/list.png" alt="brands-png" width={125} height={125} />
          </div>
          <div className="flex flex-col center items-start w-[50%]">
            <h1 className="text-3xl font-bold text-white">Tasks</h1>
            <p className="font-semibold text-lg">{tasks?.length}</p>
          </div>
        </div>

        <div
          className={`w-[25%] rounded-xl ${styles.glassCard} flex p-2 gap-7 justify-center items-center lg:w-[25%] md:w-[100%] sm:w-[100%] sm:justify-center sm:items-center sm:rounded-xl sm:p-2 sm:glassCard    xs:w-[100%] xs:justify-center xs:items-center xs:rounded-xl xs:p-2 sm:glassCard`}
        >
          <div className="w-[50%] flex justify-end">
            <Image src="/check.png" alt="brands-png" width={125} height={125} />
          </div>
          <div className="flex flex-col center items-start w-[50%]">
            <h1 className="text-3xl font-bold text-white">Done</h1>
            <p className="font-semibold text-lg">{completedTasksLength}</p>
          </div>
        </div>

        <div
          className={`w-[25%] rounded-xl ${styles.glassCard} flex p-2 gap-7 justify-center items-center lg:w-[25%] md:w-[100%] sm:w-[100%] sm:justify-center sm:items-center sm:rounded-xl sm:p-2 sm:glassCard    xs:w-[100%] xs:justify-center xs:items-center xs:rounded-xl xs:p-2 sm:glassCard`}
        >
          <div className="w-[50%] flex justify-end">
            <Image
              src="/checklist.png"
              alt="brands-png"
              width={125}
              height={125}
            />
          </div>
          <div className="flex flex-col center items-start w-[50%]">
            <h1 className="text-3xl font-bold text-white">Todo</h1>
            <p className="font-semibold text-lg">{assignedTasksLength}</p>
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
            Tasks
          </h1>
          {tasks?.map((task, index) => {
            return (
              <div
                key={index}
                className={`w-full border-[1px] border-white/15 flex rounded-xl h-[10vh] justify-between p-10 items-center`}
              >
                <h1 className="text-lg font-bold flex justify-start items-center text-white w-[30%]">
                  {task.title}
                </h1>
                <h1 className="text-lg font-bold flex justify-start items-center text-white w-[30%]">
                  {task?.userId?.username}
                </h1>
                <p className="text-white w-[30%] flex justify-start items-center">
                  {task.desc.length > 15
                    ? task.desc.slice(0, 15).concat("...")
                    : task.desc}
                </p>
                <div
                  className={`w-[10px] h-[10px] rounded-full ${
                    task?.status === "assigned" ? "bg-red-600" : "bg-green-500"
                  } shadow-sm shadow-red-400`}
                ></div>
              </div>
            );
          })}
        </div>
        <div
          className={`lg:w-[33%] rounded-xl ${styles.glassCard} flex justify-center items-center h-[420px] sm:w-[100%] md:w-[100%]`}
        >
          <ChartComponent chartData={chartData} options={options} />
        </div>
      </div>
    </div>
  );
};

export default StatsPage;
