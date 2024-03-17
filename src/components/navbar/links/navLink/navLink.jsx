"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const NavLink = ({ item }) => {

    const pathName = usePathname();

  return (
    <Link href={item.path} className={`min-w-[100px] p-[10px] rounded-[20px] font-medium text-center ${pathName === item.path && " bg-white text-[#0d0c22]"}`}>{item.title}</Link>
  );
};

export default NavLink;
