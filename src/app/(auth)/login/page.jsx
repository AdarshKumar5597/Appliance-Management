import { handleGithubLogin} from "@/lib/action";
import styles from "./login.module.css";
import LoginForm from "@/components/loginForm/LoginForm";
import { auth } from "@/lib/auth";

const LoginPage = async () => {
  const session = await auth();
  return (
    <div>
      <div className="container flex items-center justify-center">
        <div
          className={`${styles.wrapper} w-[500px] p-[50px] flex flex-col text-center gap-[30px] rounded-[5px]`}
        >
          <LoginForm session={session}/>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
