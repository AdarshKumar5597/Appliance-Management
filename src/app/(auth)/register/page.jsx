import React from "react";
import styles from "./register.module.css";
import RegisterForm from "@/components/registerForm/RegisterForm";

export const metadata = {
  title: "Register Page",
  description: "Register",
}


const RegisterPage = () => {
  return (
    <div className="container flex items-center justify-center">
      <div className={`${styles.wrapper} w-[500px] p-[50px] flex flex-col text-center gap-[30px] rounded-[5px]`}>
        <RegisterForm />
      </div>
    </div>
  );
};

export default RegisterPage;
