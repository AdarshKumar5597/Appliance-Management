import React from "react";
import Links from "./links/Links";
import Link from "next/link";
import { auth } from "@/lib/auth";

const Navbar = async () => {
  const session = await auth();
  console.log("Session: ", session);
  return (
    <div className="text-xl h-[100px] flex items-center justify-between">
      <Link href={"/"} className="text-[30px] font-bold">Logo</Link>
      <div>
        <Links session = { session } />
      </div>
    </div>
  );
};

export default Navbar;
