import React from "react"
import Links from "./links/Links"
import Link from "next/link"
import { auth } from "@/lib/auth"

const Navbar = async () => {
  const session = await auth()
  console.log("Session: ", session)
  return (
    <div className="px-12 py-2 font-mono h-auto flex items-center justify-between text-black">
      <Link
        href={"/"}
        className="text-[3rem] font-mono bg-clip-text text-transparent bg-gradient-to-r from-red-500 to bg-fuchsia-600"
      >
        AppHQ
      </Link>
      <div className="text-[1.3rem] font-medium">
        <Links session={session} />
      </div>
    </div>
  )
}

export default Navbar
