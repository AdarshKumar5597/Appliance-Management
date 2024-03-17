import { Task, User } from "./models";
import { connectToDb } from "./utils";
import { unstable_noStore as noStore } from "next/cache";
import { NextResponse } from "next/server";

export const getTasks = async () => {
  try {
    await connectToDb();
    const tasks = await Task.find({}).populate("userId", "username");
    return tasks;
  } catch (error) {
    console.log(error);
    throw new Error("Error getting tasks");
  }
};

export const getTask = async (id) => {
  noStore(); // its not gonna cache any more
  try {
    await connectToDb();
    const task = await Task.find({ _id: id });
    return task[0];
  } catch (error) {
    console.log(error);
    throw new Error("Error getting task");
  }
};

export const getUser = async (id) => {
  try {
    await connectToDb();
    const user = await User.find({ id });
    return user[0];
  } catch (error) {
    console.log(error);
    throw new Error("Error getting user");
  }
};

export const getUsers = async () => {
  try {
    await connectToDb();
    const users = await User.find({});
    return users;
  } catch (error) {
    console.log(error);
    throw new Error("Error getting users");
  }
};

export const getUsersForAdminPage = async () => {
  try {
    await connectToDb();
    const users = await User.find({});
    return NextResponse.json(users);
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch users");
  }
};

export const getTasksForAdminPage = async () => {
  try {
    await connectToDb();
    const tasks = await Task.find({})
      .sort({ createdAt: -1 })
      .populate("userId", "username");
    return NextResponse.json(tasks);
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch tasks");
  }
};
