"use client"
import React, { useEffect } from "react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import styles from "./updateForm.css"
import { createHistory, getUserName } from "@/lib/action"
import Image from "next/image"
const AddPageComponent = async ({ session }) => {
  const [device, setDevice] = useState("fan")
  const [status, setStatus] = useState()
  const [speed, setSpeed] = useState(0)
  const [bulb, setBulb] = useState(0)
  const { register, setValue, handleSubmit, reset } = useForm()

  console.log(status)
  const response = async () => {
    await fetch("https://kodessphere-api.vercel.app/devices/n16r1l1")
      .then((data) => {
        return data.json()
      })
      .then((res) => {
        setStatus(res)
      })
  }

  useEffect(() => {
    response()
  }, [])
  // await response();

  const handleChange = (e) => {
    const newValue = parseInt(e.target.value)
    setValue("value", newValue)
    if (device === "fan") {
      setSpeed(newValue)
      if (newValue === 0) {
        setSpeed(6)
      }
    }

    if (device === "bulb") {
      setBulb(newValue)
    }
  }

  const handleColorChange = (e) => {
    setValue("value", e.target.value)
  }

  const handlePost = async (data) => {
    setValue("device", device)

    let body = {
      device: device,
      teamid: data.teamid,
      value: data.value,
    }

    if (data.device !== "led") {
      body.value = Number(data.value)
    }

    if (data.device === "ac") {
      body.value = {
        temp: Number(data.temp),
        state: Number(data.state),
      }
    }

    const res = await fetch("https://kodessphere-api.vercel.app/devices", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })

    let result = await res.json()

    console.log("result: ", result)

    let bodyForHistoryDatabase = {
      username: await getUserName(session?.user?.id),
      appliance: device,
      value: data.value,
      success: result.success,
    }

    let historyRes = await createHistory(bodyForHistoryDatabase)

    console.log("historyRes: ", historyRes)

    console.log(body)
  }

  const handleDeviceChange = (e) => {
    setDevice(e.target.value)
    setValue("value", null)
    setValue("temp", null)
    setValue("state", 1)
    setValue("device", device)
    reset({
      device: e.target.value, // Set default device on reset
    })
  }

  console.log("device: ", device)

  return (
    <div className="w-full flex lg:flex-row flex-col gap-y-2 justify-between font-mono">
      <div className="flex justify-center items-center w-1/4 h-1/4 ml-12">
        {device === "fan" && (
          <Image
            src={"/fan-removebg-preview.png"}
            alt="contact"
            height={400}
            width={400}
            className={`object-contain`}
            style={{
              animation: `rotateImg ${6 - speed}s linear infinite`,
              overflow: "hidden",
            }}
          />
        )}
        {device === "bulb" && (
          <Image
            src={bulb ? "/bulb_on.png" : "/bulb_off_ok.png"}
            alt="contact"
            height={400}
            width={400}
            className={`object-contain`}
          />
        )}
        {device === "led" && (
          <Image
            src={"/led-update.png"}
            alt="contact"
            height={200}
            width={200}
            className={`object-contain`}
          />
        )}
        {device === "ac" && (
          <Image
            src={"/ac-update.png"}
            alt="contact"
            height={400}
            width={400}
            className={`object-contain`}
          />
        )}
      </div>
      <form onSubmit={handleSubmit(handlePost)} className="w-1/2">
        <div>
          <select
            className="bg-[#3673fd] w-full font-bold cursor-pointer border-none p-4 rounded-[5px]"
            value={device}
            onChange={handleDeviceChange}
          >
            <option value={"fan"}>FAN</option>
            <option value={"bulb"}>BULB</option>
            <option value={"led"}>LED</option>
            <option value={"ac"}>AC</option>
          </select>
        </div>
        <div className="mt-4">
          <label className="text-black">Team ID : </label>
          <input
            type="text"
            {...register("teamid")}
            className="p-2 w-full text-black"
            placeholder="Team ID"
            value={"n16r1l1"}
          />
        </div>
        <br />
        <div>
          <label className="text-black">Device : </label>
          <input
            type="text"
            className="p-2 w-full text-black"
            placeholder="Device"
            value={device}
          />
        </div>
        <br />
        {device == "fan" && (
          <div>
            <label className="text-black">Value : </label>
            <input
              type="number"
              {...register("value")}
              className="p-2 w-full text-black"
              placeholder={`Current Speed - ${status?.fan}, Enter speed between 0 - 5`}
              max={5}
              min={0}
              onChange={handleChange}
            />
          </div>
        )}
        {device == "bulb" && (
          <div>
            <label className="text-black">Value : </label>
            <input
              type="number"
              {...register("value")}
              className="p-2 w-full text-black"
              placeholder={`Current status - ${status?.bulb}, Enter 0 to OFF , 1 to ON`}
              max={1}
              min={0}
              onChange={handleChange}
            />
          </div>
        )}
        {device == "led" && (
          <div>
            <label className="text-black">Value : </label>
            <input
              type="color"
              {...register("value")}
              className="p-2 h-10 rounded-[10rem] w-full text-black"
              onChange={handleColorChange}
            />
          </div>
        )}
        {device == "ac" && (
          <div>
            <label className="text-black">Temperature : </label>
            <input
              type="number"
              {...register("temp")}
              className="p-2 w-full text-black"
              placeholder={`Current Temp - ${status?.ac.temp}, Enter Temp`}
              max={30}
              min={16}
              onChange={handleChange}
            />

            <label className="text-black">Power : </label>
            <select className=" text-black mt-4" {...register("state")}>
              <option value={1}>ON</option>
              <option value={0}>OFF</option>
            </select>
            <br />
          </div>
        )}
        <button type="submit" className=" p-3 bg-blue-700 mt-4 rounded-lg">
          SUBMIT
        </button>
      </form>
    </div>
  )
}

export default AddPageComponent
