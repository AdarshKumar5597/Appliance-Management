"use client";
import React, { useEffect } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import styles from "./updateForm.css";
import { createHistory, getUserName } from "@/lib/action";

const AddPageComponent = async ({ session }) => {
  const [device, setDevice] = useState("fan");
  const [status, setStatus] = useState();
  const { register, setValue, handleSubmit, reset } = useForm();

  console.log(status);
  const response = async () => {
    await fetch("https://kodessphere-api.vercel.app/devices/n16r1l1")
      .then((data) => {
        return data.json();
      })
      .then((res) => {
        setStatus(res);
      });
  };

  useEffect(() => {
    response();
  }, []);
  // await response();

  const handleChange = (e) => {
    const newValue = parseInt(e.target.value);
    setValue("value", newValue);
  };

  const handleColorChange = (e) => {
    setValue("value", e.target.value);
  };

  const handlePost = async (data) => {
    setValue("device", device);

    let body = {
      device: device,
      teamid: data.teamid,
      value: data.value,
    };

    if (data.device !== "led") {
      body.value = Number(data.value);
    }

    if (data.device === "ac") {
      body.value = {
        temp: Number(data.temp),
        state: Number(data.state),
      };
    }

    const res = await fetch('https://kodessphere-api.vercel.app/devices', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    let result = await res.json();

    console.log("result: ", result);

    let bodyForHistoryDatabase = {
      username: await getUserName(session?.user?.id),
      appliance: device,
      value: data.value,
      success: result.success,
    }

    let historyRes = await createHistory(bodyForHistoryDatabase);

    console.log("historyRes: ", historyRes);

    console.log(body);
  };

  const handleDeviceChange = (e) => {
    setDevice(e.target.value);
    setValue("value", null);
    setValue("temp", null);
    setValue("state", 1);
    setValue("device", device);
    reset({
      device: e.target.value, // Set default device on reset
    });
  };

  console.log("device: ", device);

  return (
    <div className="flex flex-col gap-y-2">
      <form onSubmit={handleSubmit(handlePost)} className={styles.container}>
        <select
          className="bg-[#3673fd] w-full font-bold cursor-pointer border-none p-[20px] rounded-[5px]"
          value={device}
          onChange={handleDeviceChange}
        >
          <option value={"fan"}>FAN</option>
          <option value={"bulb"}>BULB</option>
          <option value={"led"}>LED</option>
          <option value={"ac"}>AC</option>
        </select>

        <label>Team ID : </label>
        <input
          type="text"
          {...register("teamid")}
          className="p-2 w-full text-black"
          placeholder="Team ID"
          value={"n16r1l1"}
        />
        <br />
        <label>Device : </label>
        <input
          type="text"
          className="p-2 w-full text-black"
          placeholder="Device"
          value={device}
        />
        <br />
        {device == "fan" && (
          <>
            <label>Value : </label>
            <input
              type="number"
              {...register("value")}
              className="p-2 w-full text-black"
              placeholder={`Current Speed - ${status?.fan}, Enter speed between 0 - 5`}
              max={5}
              min={0}
              onChange={handleChange}
            />
          </>
        )}
        {device == "bulb" && (
          <>
            <label>Value : </label>
            <input
              type="number"
              {...register("value")}
              className="p-2 w-full text-black"
              placeholder={`Current status - ${status?.bulb}, Enter 0 to OFF , 1 to ON`}
              max={1}
              min={0}
              onChange={handleChange}
            />
          </>
        )}
        {device == "led" && (
          <>
            <label>Value : </label>
            <input
              type="color"
              {...register("value")}
              className="p-2 w-full text-black"
              onChange={handleColorChange}
            />
          </>
        )}
        {device == "ac" && (
          <>
            <label>Temperature : </label>
            <input
              type="number"
              {...register("temp")}
              className="p-2 w-full text-black"
              placeholder={`Current Temp - ${status?.ac.temp}, Enter Temp`}
              max={30}
              min={16}
              onChange={handleChange}
            />

            <label>Power : </label>
            <select className=" text-black mt-4" {...register("state")}>
              <option value={1}>ON</option>
              <option value={0}>OFF</option>
            </select>
            <br />
          </>
        )}
        <button type="submit" className=" p-3 bg-blue-700 mt-4 rounded-lg">
          SUBMIT
        </button>
      </form>
    </div>
  );
};

export default AddPageComponent;