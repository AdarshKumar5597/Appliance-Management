import Image from "next/image";

export const metadata = {
  title: "About Page",
  description: "About us",
};

const AboutPage = () => {
  return (
    <div className=" lg:flex lg:flex-row lg:gap-x-[100px] md:flex md:flex-col sm:flex sm:flex-col">
      <div className="flex-1 flex flex-col gap-y-[30px]">
        <p className=" text-lg font-bold text-[#3673fd]">About Task Manager</p>
        <h1 className=" text-5xl font-bold">
          Create, Manage, Edit Tasks efficiently.
        </h1>
        <p className="text-[20px] font-semibold">
          An efficient platform for managing Tasks and Checking the progress.

        </p>
      </div>
      <div className="flex-1 relative">
        <Image
        src={"/about.png"}
        alt="about"
        fill
        className=" object-contain"/>
      </div>
    </div>
  );
};

export default AboutPage;
