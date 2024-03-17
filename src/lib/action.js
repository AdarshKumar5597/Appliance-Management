"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { Task, User } from "./models";
import { connectToDb } from "./utils";
import { signIn, signOut } from "./auth";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export const addTask = async (formData) => {
  const { title, desc, userId, status } = formData;

  try {
    await connectToDb();
    const newTask = await new Task({
      title,
      desc,
      userId,
      status,
    }).save();

    const user = await User.findById(userId);
    await user.tasks.push(newTask._id);
    await user.save();

    console.log(newTask);
    revalidatePath("/task");
    revalidatePath("/admin");
  } catch (error) {
    console.log(error);
    console.log("Something went wrong");
  }
};

export const updateTask = async (formData) => {
  const { id, title, desc, status } = formData;

  try {
    await connectToDb();
    const updatedTask = await Task.findByIdAndUpdate(id, {
      title,
      desc,
      status,
    });
    console.log(updatedTask);
    revalidatePath("/task");
    revalidatePath("/admin");
  } catch (error) {
    console.log(error);
    console.log("Something went wrong while updating the Task");
  }
};

export const deleteTask = async (id) => {
  console.log("Inside deleteTask");
  try {
    await connectToDb();
    await Task.findByIdAndDelete(id);
    revalidatePath("/task");
    revalidatePath("/admin");
  } catch (error) {
    console.log(error);
    console.log("Something went wrong while deleting the Task");
  }
};

export const addUser = async (formData) => {
  const { username, email, img, isAdmin, isUser, isThirdPerson } = formData;

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  try {
    await connectToDb();
    const newUser = await new User({
      username,
      email,
      password: hashedPassword,
      img,
      isAdmin,
      isUser,
      isThirdPerson,
    }).save();
    console.log(newUser);
    revalidatePath("/admin");
  } catch (error) {
    console.log(error);
    console.log("Something went wrong");
  }

  console.log(title, desc, slug);
};

export const deleteUser = async (id) => {
  try {
    await connectToDb();
    await Task.deleteMany({ userId: id });
    await User.findByIdAndDelete(id);
    revalidatePath("/admin");
  } catch (error) {
    console.log(error);
    console.log("Something went wrong while deleting the User");
  }
};

export const handleGithubLogin = async (event) => {
  await signIn("github");
};

export const handleLogout = async (event) => {
  await signOut({ redirect: false });
};

export const registerUser = async (formData) => {
  const { username, email, password, img, passwordRepeat } = formData;

  console.log(formData);

  if (password !== passwordRepeat) {
    return { error: "Passwords do not match" };
    // throw new Error("Passwords do not match");
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  try {
    await connectToDb();

    const user = await User.findOne({ email });
    if (user) {
      // console.log("User already exists");
      return { error: "User already exists" };
    }

    const newUser = await new User({
      username,
      email,
      password: hashedPassword,
      img: img ? img.name : "",
    }).save();

    console.log(newUser);
    return { success: true };
  } catch (error) {
    console.log(error);
    throw new Error("Something went wrong while saving the user");
  }
};

export const login = async (formData) => {
  // const { username, password } = Object.fromEntries(formData);
  const { username, password } = formData;

  try {
    await signIn("credentials", { username, password, redirect: false });
  } catch (err) {
    console.log(err);

    if (err.message.includes("CredentialsSignin")) {
      return { error: "Invalid username or password" };
    }
    throw err;
  }
};

export const getTasksOfUser = async (userId) => {
  try {
    await connectToDb();
    const tasks = await Task.find({ userId })
      .sort({ createdAt: -1 })
      .populate("userId", "username");
    return NextResponse.json(tasks);
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch tasks");
  }
};
