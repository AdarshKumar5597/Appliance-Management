import Image from "next/image";
import React from "react";

const TaskCard = ({ task }) => {
  return (
    <div className="flex flex-col gap-[10px] mb-[20px]">
      <div className="flex">
        <div className="w-[90%] h-[200px] relative">
          <Image
            src={"/task.png"}
            alt="post"
            height={400}
            width={200}
            className="object-cover"
          />
        </div>
      </div>
      <div>
        <p className="font-bold text-2xl mb-[10px] w-[90%]">
          {task.title}
          <span className=" text-[12px] rotate-[270deg] m-auto">
            &nbsp;&nbsp;{"("}{task.createdAt.slice(0, 10)}{")"}
          </span>
        </p>
        <p className="mb-[20px] font-semibold text-gray-500 w-[90%]">
          {task.desc}
        </p>
      </div>
    </div>
  );
};

export default TaskCard;
