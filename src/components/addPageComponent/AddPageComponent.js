"use client";
import React from "react";
import { useState } from "react";
import AdminTaskToUserForm from "../adminTaskToUserForm/AdminTaskToUserForm";
import Admintasks from "../adminTasks/AdminTasks";

const AddPageComponent = ({ session, tasks }) => {
  const [addTask, setAddTask] = useState(false);
  const handleClick = () => {
    setAddTask((prev) => !prev);
  };
  return (
    <div className="flex flex-col gap-y-2">
      {
        <button
          className="bg-[#3673fd] font-bold cursor-pointer border-none p-[20px] rounded-[5px]"
          onClick={handleClick}
        >
          Add Task
        </button>
      }
      {addTask ? (
        <div className="w-full">
          <AdminTaskToUserForm setAddTask={handleClick} user={session.user} />
        </div>
      ) : (
        <Admintasks tasks={tasks} isUser={true} />
      )}
    </div>
  );
};

export default AddPageComponent;
