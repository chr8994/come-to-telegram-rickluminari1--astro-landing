"use client"

import { motion } from "framer-motion"

import { Icons } from "@/components/magicui/icons"
import HeroVideoDialog from "@/components/magicui/hero-video"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { RainbowButton } from "../ui/rainbow-button"
import { Boxes } from "../ui/background-boxes"
import FlickeringGrid from "../ui/flickering-grid"
import DotPattern from "../ui/dot-pattern"

const ease = [0.16, 1, 0.3, 1]

function HeroPill() {
  return (
    <motion.a
      href="/signup"
      className="bg-primary/20 ring-accent flex w-auto items-center space-x-2 whitespace-pre rounded-full px-2 py-1 ring-1"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease }}
    >
      <div className="bg-accent text-primary w-fit rounded-full px-2 py-0.5 text-center text-xs font-medium sm:text-sm">
        📣 Announcement
      </div>
      <p className="text-primary text-xs font-medium sm:text-sm">
        Introducing Starbot.ai
      </p>
      <svg
        width="12"
        height="12"
        className="ml-1"
        viewBox="0 0 12 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M8.78141 5.33312L5.20541 1.75712L6.14808 0.814453L11.3334 5.99979L6.14808 11.1851L5.20541 10.2425L8.78141 6.66645H0.666748V5.33312H8.78141Z"
          fill="hsl(var(--primary))"
        />
      </svg>
    </motion.a>
  )
}

function HeroTitles() {
  return (
    <div className="flex w-full max-w-2xl flex-col space-y-4 overflow-hidden pt-8">
      <motion.h1
        className="text-foreground text-center text-4xl font-medium leading-tight sm:text-5xl md:text-6xl"
        initial={{ filter: "blur(10px)", opacity: 0, y: 50 }}
        animate={{ filter: "blur(0px)", opacity: 1, y: 0 }}
        transition={{
          duration: 1,
          ease,
          staggerChildren: 0.2
        }}
      >
        {["Unlock", "the", "Future", "of", "Home", "Sales", "Today"].map(
          (text, index) => (
            <motion.span
              key={index}
              className="inline-block text-balance px-1 font-bold md:px-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: index * 0.2,
                ease
              }}
            >
              {text}
            </motion.span>
          )
        )}
      </motion.h1>
      <motion.p
        className="text-muted-foreground mx-auto max-w-xl text-balance text-center text-lg leading-7 sm:text-xl sm:leading-9"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.6,
          duration: 0.8,
          ease
        }}
      >
        Trusted by builders nationwide to streamline their operations, our AI
        can help you succeed.
      </motion.p>
    </div>
  )
}

function HeroCTA() {
  return (
    <>
      <motion.div
        className="mx-auto mt-6 flex w-full max-w-2xl flex-col items-center justify-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.8, ease }}
      >
        {/* <Link
          href="/signup"
          className={cn(
            buttonVariants({ variant: "default" }),
            "w-full sm:w-auto text-background flex gap-2"
          )}
        >
          <Icons.logo className="h-6 w-6" />
          Get started for free
        </Link> */}
        <RainbowButton className="w-full sm:w-auto">
          Get started for free
        </RainbowButton>
      </motion.div>
      <motion.p
        className="text-muted-foreground mt-5 text-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.0, duration: 0.8 }}
      >
        7 day free trial. No credit card required.
      </motion.p>
    </>
  )
}

function HeroImage() {
  return (
    <motion.div
      className="relative mx-auto flex w-full items-center justify-center"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.2, duration: 1, ease }}
    >
      <HeroVideoDialog
        animationStyle="from-center"
        videoSrc="https://www.youtube.com/embed/qh3NGpYRG3I?si=4rb-zSdDkVK9qxxb"
        thumbnailSrc="/dashboard4.png"
        thumbnailAlt="Hero Video"
        className="mt-16 max-w-screen-lg rounded-lg border shadow-lg"
      />
    </motion.div>
  )
}

export default function Hero2() {
  return (
    <section id="hero">
      <div className="absolute left-0 size-full overflow-hidden opacity-50">
        <div className="pointer-events-none absolute inset-0 z-20 size-full [mask-image:radial-gradient(transparent,white)]" />
        {/* <Boxes /> */}
        {/* <FlickeringGrid
            className="z-0 absolute inset-0 size-full"
            squareSize={6}
            gridGap={6}
            color="#6B7280"
            maxOpacity={0.25}
            flickerChance={0.1}
          /> */}
        <DotPattern />
      </div>
      <div className="relative flex w-full flex-col items-center justify-start px-4 pt-32 sm:px-6 sm:pt-24 md:pt-32 lg:px-8">
        <HeroPill />
        <HeroTitles />
        <HeroCTA />
        <HeroImage />
      </div>
    </section>
  )
}
