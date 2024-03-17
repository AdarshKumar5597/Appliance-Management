"use server";
import { History, User } from "./models";
import { connectToDb } from "./utils";
import { signIn, signOut } from "./auth";
import bcrypt from "bcryptjs";


export const handleLogout = async (event) => {
  await signOut({ redirect: false });
};

export const registerUser = async (formData) => {
  const { username, email, password, passwordRepeat } = formData;

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

export const createHistory = async (formData) => {
  console.log(formData);
  try {
    connectToDb();
    const newHistory = await new History(formData).save();
    return { success: true };
  } catch (error) {
    console.log(error);
    throw new Error("Error saving history");
  } 
}

export const getHistory = async () => {
  try {
    await connectToDb();
    const history = await History.find({ });
    return history;
  } catch (error) {
    console.log(error);
    throw new Error("Error getting history");
  }
}

export const getUserName = async (id) => {
  try {
    await connectToDb();
    const user = await User.findOne({ _id: id});
    return user.username;
  }
  catch (error) {
    console.log(error);
    throw new Error("Error getting username");
  }
}
