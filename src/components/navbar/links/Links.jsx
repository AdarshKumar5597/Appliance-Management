"use client"
import React, { useState } from "react"
import NavLink from "./navLink/navLink"
import Image from "next/image"
import { handleLogout } from "@/lib/action"
import { useRouter } from "next/navigation"

const Links = ({ session }) => {
  const [open, setOpen] = useState(false)
  const router = useRouter()
  const links = [
    {
      title: "About",
      path: "/about",
    },
    { title: "Update", path: "/update" },

    { title: "Stats", path: "/statistics" },
  ]

  async function refreshPageOnLogout() {
    await handleLogout()
    router.replace("/login")
    router.refresh()
  }

  return (
    <div>
      <div className="flex items-center gap-x-[10px] navbarLinks">
        {links.map((link, index) => (
          <NavLink key={index} item={link}></NavLink>
        ))}
        {session?.user ? (
          <>
            <button
              onClick={async () => {
                await refreshPageOnLogout()
              }}
              className="p-[10px] cursor-pointer font-bold bg-white rounded-[10px] text-[#0d0c22]"
            >
              Logout
            </button>
          </>
        ) : (
          <NavLink item={{ title: "Login", path: "/login" }}></NavLink>
        )}
      </div>

      <Image
        width={30}
        height={30}
        src={"/menu.png"}
        onClick={() => {
          setOpen((prev) => !prev)
        }}
        className="menuButton"
      ></Image>
      {open && (
        <div
          className="mobileLinks absolute top-[100px] right-0 w-[50%] 
        h-[calc(100vh-100px)] flex flex-col items-center justify-center gap-[10px] p-[10px] cursor-pointer font-bold rounded-[10px] border-l-[1px] border-white z-10"
        >
          {links.map((link, index) => (
            <NavLink key={index} item={link}></NavLink>
          ))}
        </div>
      )}
    </div>
  )
}

export default Links
