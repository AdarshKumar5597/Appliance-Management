import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: {
    default: "Appliance Management System",
    template: "%s | Appliance Management System",
  },
  description: "This is the home page",
}

export default function Home() {
  if (!process.env.NEXT_PUBLIC_BASE_API_URL){
    
    return null;
  }
  
  return (
    <div className="flex">
      <div className="flex flex-col gap-y-7 flex-1">
        <h1 className="text-[56px] font-bold">Appliance Management</h1>
        <p className="text-[20px]">
          An efficient platform for managing and monitoring applainces and Checking the status.
        </p>
        <div className="flex gap-x-[20px]">
          <button className="p-[20px] min-w-[120px] cursor-pointer border-none rounded-[5px] bg-[#00FF66] text-[#0d0c22] font-bold">
            <Link href="/update">Update</Link>
          </button>
          <button className="p-[15px] min-w-[120px] cursor-pointer border-none font-bold rounded-[5px] bg-white text-[#0d0c22]">
          <Link href="/statistics">Status</Link>
          </button>
        </div>
        <div className="w-[500px] h-[50px] relative grayscale-[1]">
          <Image src={"/brands.png"} alt="brands-png" fill></Image>
        </div>
      </div>
      <div className=" flex-1 relative">
        <Image src={"/hero.gif"} alt="hero-png" fill className=" object-contain"></Image>
      </div>
    </div>
  );
}
