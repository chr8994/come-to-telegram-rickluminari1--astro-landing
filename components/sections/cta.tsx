import { Icons } from "@/components/magicui/icons"
import Section from "@/components/magicui/section"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { Boxes } from "../ui/background-boxes"
import FlickeringGrid from "../ui/flickering-grid"

export default function CtaSection() {
  return (
    <Section
      id="cta"
      title="Ready to get started?"
      subtitle="Start your free trial today."
      className="relative rounded-xl"
    >
      <div className="absolute top-0 z-0 size-full overflow-hidden opacity-50">
        <div className="pointer-events-none relative inset-0 z-20 size-full [mask-image:radial-gradient(transparent,white)]" />
        {/* <Boxes /> */}
        <FlickeringGrid
          className="absolute inset-0 z-0 size-full"
          squareSize={6}
          gridGap={6}
          color="#6B7280"
          maxOpacity={0.25}
          flickerChance={0.1}
        />
      </div>
      <div className="flex w-full flex-col items-center justify-center space-y-4 py-16 pt-4 sm:flex-row sm:space-x-4 sm:space-y-0">
        <Link
          href="/signup"
          className={cn(
            buttonVariants({ variant: "default" }),
            "text-background flex w-full gap-2 sm:w-auto"
          )}
        >
          <Icons.logo className="size-6" />
          Get started for free
        </Link>
      </div>
    </Section>
  )
}
