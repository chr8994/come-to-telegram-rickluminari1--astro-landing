"use client"

import Link from "next/link"
import { FC } from "react"
// import { ChatbotUISVG } from "../icons/chatbotui-svg"
import { StarfleetLogo } from "../icons/starfleet-logo"

interface BrandProps {
  theme?: "dark" | "light"
}

export const Brand: FC<BrandProps> = ({ theme = "dark" }) => {
  return (
    <Link
      className="flex cursor-pointer flex-col items-center"
      href="https://bot.starfleet.pw"
      target="_blank"
      rel="noopener noreferrer"
    >
      <div className="mb-2">
        {/* <ChatbotUISVG theme={theme === "dark" ? "dark" : "light"} scale={0.3} /> */}
        <StarfleetLogo />
      </div>

      <div
        style={{ marginTop: "10px" }}
        className="text-4xl font-bold tracking-wide"
      >
        Starbot
      </div>
    </Link>
  )
}
