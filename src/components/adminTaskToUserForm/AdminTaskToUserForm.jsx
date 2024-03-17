"use client";

import { addTask } from "@/lib/action";
import styles from "./adminTaskToUserForm.module.css";
import { useForm } from "react-hook-form";

const AdminTaskToUserForm = (props) => {
  console.log(props);
  let user = props.user;
  let setAddTask = props.setAddTask;
  const { handleSubmit, register } = useForm();

  async function onSubmit(data) {
    console.log(data);
    try {
      if (data) {
        await addTask(data);
        setAddTask();
      }else {
        return;
      }
    } catch (error) {
      console.log("Error: ", error);
      return;
    }
  }

  const handleClick = () => {
    setAddTask();
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.container}>
      {!user.id && <h1>Edit Task</h1>}
      <input
        type="hidden"
        name="userId"
        value={user?._id || user?.id}
        {...register("userId")}
      />
      <input
        type="text"
        name="title"
        placeholder="Title"
        {...register("title")}
      />
      <textarea
        type="text"
        name="desc"
        placeholder="Description"
        rows={10}
        {...register("desc")}
      />
      <select name="status" {...register("status")}>
        <option value="assigned">Status</option>
        <option value="assigned">Assigned</option>
        <option value="completed">Completed</option>
      </select>
      <button type="submit">Submit</button>
      <button onClick={handleClick}>Cancel</button>
    </form>
  );
};

export default AdminTaskToUserForm;
