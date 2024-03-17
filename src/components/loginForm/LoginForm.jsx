// "use client";

// import { login } from "@/lib/action";
// import styles from "./loginForm.module.css";
// import { useFormState } from "react-dom";
// import Link from "next/link";

// const LoginForm = () => {
//   const [state, formAction] = useFormState(login, undefined);

//   return (
//     <form className={styles.form} action={formAction}>
//       <input type="text" placeholder="username" name="username" />
//       <input type="password" placeholder="password" name="password" />
//       <button>Login</button>
//       {state?.error}
//       <Link href="/register">
//         {"Don't have an account?"} <b>Register</b>
//       </Link>
//     </form>
//   );
// };

// export default LoginForm;

"use client";
import { login } from "@/lib/action";
import { useForm } from "react-hook-form";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const LoginForm = (props) => {
  let session = props.session ? props.session : null;
  const router = useRouter();

  if (session) {
    router.push("/");
  }

  const [errors, setErrors] = useState(null);
  const {
    handleSubmit,
    register,
  } = useForm();


  async function onSubmit(data) {
    let response = null;
    try {
      response = await login(data);
      if (response?.error) setErrors(response);
    } catch (error) {
      console.log("Error: ", error);
      return;
    }
    // if (response?.success) router.push("/login");
    if (session === null ) router.refresh();
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
          type="password"
          placeholder="Password"
          name="password"
          {...register("password", { required: true })}
        />

        <button
          type="submit"
          className="bg-[#3673fd] font-bold cursor-pointer border-none p-[20px] rounded-[5px]"
        >
          Login
        </button>

        {errors &&
          Object.keys(errors).map((error) => (
            <p key={error} className="text-red-500 text-sm font-semibold">
              {errors?.error}
            </p>
          ))}

        <Link href="/login">
          {"Don't have an account? "} <b>Register</b>
        </Link>
      </form>
    </div>
  );
};

export default LoginForm;
