"use client";
import { deleteTask } from "@/lib/action";
import styles from "./adminTasks.module.css";
import Image from "next/image";
import AdminTaskForm from "../adminTaskForm/AdminTaskForm";
import { useState } from "react";

const Admintasks = async (props) => {
  const tasks = props.tasks;
  const isUser = props.isUser;
  const [task, setTask] = useState(null);

  const handleTask = () => {
    setTask(null);
  };

  const handleDelete = async (task) => {
    console.log("task inside handleDetele: ", task);
    try {
      await deleteTask(task._id);
    } catch (error) {
      console.log("Error: ", error);
      return;
    }
  };
  return (
    <div className={!isUser ? styles.row : "flex flex-col-reverse gap-y-[20px]"}>
      <div className={styles.col}>
        {!isUser && <h1>Tasks</h1>}

        {tasks?.map((task, index) => (
          <div className={styles.task} key={index}>
            <div className={styles.detail}>
              <Image src={"/noavatar.png"} alt="" width={50} height={50} />
              <span className={styles.taskTitle}>{task.title}</span>
              <span className={styles.taskTitle}>{" = "}</span>
              <span className={styles.taskTitle}>
                {task.userId?.username ? task.userId?.username : ""}
              </span>
            </div>
            <div className="edit">
              <button
                className={styles.editButton}
                onClick={() => setTask(task)}
              >
                Edit
              </button>
            </div>
            <div className="delete">
              <button
                className={styles.taskButton}
                onClick={() => handleDelete(task)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {task && (
        <div className={styles.col}>
          <AdminTaskForm task={task} setTask={handleTask} isUser={isUser} />
        </div>
      )}
    </div>
  );
};

export default Admintasks;
