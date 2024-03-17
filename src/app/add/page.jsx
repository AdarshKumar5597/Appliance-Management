import Image from "next/image";
import { auth } from "@/lib/auth";
import AddPageComponent from "@/components/addPageComponent/AddPageComponent";
import { getTasksOfUser } from "@/lib/action";

const getTasks = async (userId) => {
  const response = await getTasksOfUser(userId);
  return await response.json();
}

const AddPage = async () => {
  const session = await auth();
  const userTasks = session ? await getTasks(session?.user?.id) : [];
  if (userTasks) {
    console.log("userTasks: ", userTasks);
  }

  return (
    <div className="flex items-center gap-[100px] lg:flex-row md:flex-col md:flex lg:flex lg:items-center md:justify-center sm:justify-center sm:flex sm:flex-col xs:justify-center xs:flex xs:flex-col">
      <div className="flex-1 relative h-[500px] w-[500px]">
        <Image
          src={"/contact.png"}
          alt="contact"
          fill
          className="object-contain"
        />
      </div>
      <div className="flex-1">
        <AddPageComponent session={session} tasks={userTasks}/>
      </div>
    </div>
  );
};

export default AddPage;
