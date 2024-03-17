"use client";

import { updateTask } from "@/lib/action";
import styles from "./adminTaskForm.module.css";
import { useForm } from "react-hook-form";

const AdminTaskForm = (props) => {
  console.log(props);
  let task = props.task;
  let setTask = props.setTask;
  let isUser = props.isUser === true ? true : false;
  const { handleSubmit, register } = useForm();

  async function onSubmit(data) {
    try {
      if (data) {
        await updateTask(data);
      }else{
        return;
      }
    } catch (error) {
      console.log("Error: ", error);
      return;
    }
  }

  const handleClick = () => {
    setTask();
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.container}>
      {!isUser ? <h1>Edit Task</h1> : <h1>New Task</h1>}
      <input
        type="hidden"
        name="id"
        value={task?._id.toString()}
        {...register("id", { required: true })}
      />
      <input
        type="text"
        name="title"
        placeholder={task?.title}
        {...register("title", { required: true })}
      />
      <textarea
        type="text"
        name="desc"
        placeholder={task?.desc}
        rows={10}
        {...register("desc", { required: true })}
      />
      <select name="status" {...register("status", { required: true })}>
        <option value={task?.status}>Status</option>
        <option value="assigned">Assigned</option>
        <option value="completed">Completed</option>
      </select>
      <button type="submit" onClick={handleClick}>Submit</button>
      <button  onClick={handleClick}>Cancel</button>
    </form>
  );
};

export default AdminTaskForm;
