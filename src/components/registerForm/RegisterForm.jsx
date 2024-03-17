"use client";
import { registerUser } from "@/lib/action";
import { useForm } from "react-hook-form";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const RegisterForm = () => {
  const [errors, setErrors] = useState(null);
  const {
    handleSubmit,
    register,
  } = useForm();

  const router = useRouter();

  async function onSubmit(data) {
    let response = null;
    try {
      response = await registerUser(data);
      if (response?.error) setErrors(response);
    } catch (error) {
      console.log("Error: ", error);
      return;
    }
    if (response?.success) router.push("/login");
  }

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-y-[20px]"
      >
        <input
          className="p-[20px] rounded-[5px] border-none outline-none bg-[#2d2b42] text-white"
          type="text"
          placeholder="Full Name"
          name="username"
          {...register("username", { required: true })}
        />
        <input
          className="p-[20px] rounded-[5px] border-none outline-none bg-[#2d2b42] text-white"
          type="text"
          placeholder="Email Address"
          name="email"
          {...register("email", { required: true })}
        />
        <input
          className="p-[20px] rounded-[5px] border-none outline-none bg-[#2d2b42] text-white"
          type="password"
          placeholder="Password"
          name="password"
          {...register("password", { required: true })}
        />
        <input
          className="p-[20px] rounded-[5px] border-none outline-none bg-[#2d2b42] text-white"
          type="password"
          placeholder="Confirm Password"
          name="passwordRepeat"
          {...register("passwordRepeat", { required: true })}
        />
        <input
          className="p-[20px] rounded-[5px] border-none outline-none bg-[#2d2b42] text-white"
          type="file"
          placeholder="Image"
          name="img"
          {...register("img")}
        />

        <button
          type="submit"
          className="bg-[#3673fd] font-bold cursor-pointer border-none p-[20px] rounded-[5px]"
        >
          Register
        </button>

        {errors &&
          Object.keys(errors).map((error) => (
            <p key={error} className="text-red-500 text-sm font-semibold">
              {errors?.error}
            </p>
          ))}

        <Link href="/login">
          Already have an account?&nbsp; <b>Login</b>
        </Link>
      </form>
    </div>
  );
};

export default RegisterForm;
