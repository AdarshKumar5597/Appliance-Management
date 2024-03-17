"use client";

import { deleteUser } from "@/lib/action";
import styles from "./adminUsers.module.css";
import Image from "next/image";
import AdminUserForm from "../adminUserForm/AdminUserForm";
import AdminTaskToUserForm from "../adminTaskToUserForm/AdminTaskToUserForm";
import { useState } from "react";

const AdminUsers = async ({ users }) => {
  const [addTask, setAddTask] = useState(false);
  const [user, setUser] = useState(null);

  const handleClick = (user) => {
    setUser(user);
    setAddTask(true);
  };

  const handleAddTaskSubmit = () => {
    setAddTask(false);
  }

  return (
    <div className={styles.row}>
      <div className={styles.col}>
        <h1>Users</h1>
        {users.map((user, index) => (
          <div className={styles.user} key={index}>
            <div className={styles.detail}>
              <Image
                src={user.img || "/noavatar.png"}
                alt=""
                width={50}
                height={50}
              />
              <span>{user.username}</span>
            </div>
            <div>
              <button
                className={styles.addTaskButton}
                onClick={() => handleClick(user)}
              >
                + Task
              </button>
            </div>
            <div>
              <button className={styles.userButton} onClick={async() => await deleteUser(user._id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
      {addTask ? (
        <div className={styles.col}>
          <AdminTaskToUserForm user={user} setAddTask={handleAddTaskSubmit}/>
        </div>
      ) : (
        <div className={styles.col}>
          <AdminUserForm />
        </div>
      )}
    </div>
  );
};

export default AdminUsers;
