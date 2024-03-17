"use client";

import { addUser } from "@/lib/action";
import styles from "./adminUserForm.module.css";
import { useForm } from "react-hook-form";

const AdminUserForm = () => {
  const { handleSubmit, register } = useForm();

  const onSubmit = async (data) => {
    try {
      await addUser(data);
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.container}>
      <h1>Add New User</h1>
      <input type="text" {...register("username", { required: true })} placeholder="Username" />
      <input type="text" {...register("email", { required: true })} placeholder="Email" />
      <input type="password" {...register("password", { required: true })} placeholder="Password" />
      <input type="text" {...register("img")} placeholder="Image" />
      <select {...register("isAdmin")} defaultValue="false">
        <option value="false">Is Admin?</option>
        <option value="false">No</option>
        <option value="true">Yes</option>
      </select>
      <select {...register("isUser")} defaultValue="false">
        <option value="false">Is User?</option>
        <option value="false">No</option>
        <option value="true">Yes</option>
      </select>
      <select {...register("isThirdPerson")} defaultValue="false">
        <option value="false">Is 3rd Person?</option>
        <option value="false">No</option>
        <option value="true">Yes</option>
      </select>
      <button type="submit">Add</button>
    </form>
  );
};

export default AdminUserForm;
