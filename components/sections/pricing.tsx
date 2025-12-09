"use client"

import Section from "@/components/magicui/section"
import { buttonVariants } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { siteConfig } from "@/lib/config"
import useWindowSize from "@/lib/hooks/use-window-size"
import { cn } from "@/lib/utils"
import { IconStarFilled } from "@tabler/icons-react"
import { motion } from "framer-motion"
import { Check } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"
// import { FaStar } from "react-icons/fa";

export default function PricingSection({ plans }: any) {
  console.log(plans)
  const [isMonthly, setIsMonthly] = useState(true)
  const { isDesktop } = useWindowSize()

  const handleToggle = () => {
    setIsMonthly(!isMonthly)
  }

  return (
    <Section title="Pricing" subtitle="Choose the plan that's right for you">
      {/* <div className="mb-10 flex justify-center">
        <span className="mr-2 font-semibold">Monthly</span>
        <label className="relative inline-flex cursor-pointer items-center">
          <Label>
            <Switch checked={!isMonthly} onCheckedChange={handleToggle} />
          </Label>
        </label>
        <span className="ml-2 font-semibold">Yearly</span>
      </div> */}
      <div className="sm:2 mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
        {plans.map((plan: any, index: any) => (
          <motion.div
            key={index}
            initial={{ y: 50, opacity: 1 }}
            whileInView={
              isDesktop
                ? {
                    y: 0,
                    opacity: 1,
                    x:
                      index === siteConfig.pricing.length - 1
                        ? -30
                        : index === 0
                          ? 30
                          : 0,
                    scale:
                      index === 0 || index === siteConfig.pricing.length - 1
                        ? 0.94
                        : 1.0
                  }
                : {}
            }
            viewport={{ once: true }}
            transition={{
              duration: 1.6,
              type: "spring",
              stiffness: 100,
              damping: 30,
              delay: 0.4,
              opacity: { duration: 0.5 }
            }}
            className={cn(
              `bg-background border-border relative rounded-2xl border p-6 text-center lg:flex lg:flex-col lg:justify-center`,
              index === 0 || index === siteConfig.pricing.length - 1
                ? "-translate-z-[50px] rotate-y-[10deg] z-0 translate-x-0 translate-y-0"
                : "z-10",
              index === 0 && "origin-right",
              index === siteConfig.pricing.length - 1 && "origin-left"
            )}
          >
            {plan.isPopular && (
              <div className="bg-primary absolute right-0 top-0 flex items-center rounded-bl-xl rounded-tr-xl px-2 py-0.5">
                {/* <FaStar className="text-white" /> */}
                <IconStarFilled className="text-white" />
                <span className="ml-1 font-sans font-semibold text-white">
                  Popular
                </span>
              </div>
            )}
            <div>
              <p className="text-muted-foreground text-base font-semibold">
                {plan.name}
              </p>
              <p className="mt-6 flex items-center justify-center gap-x-2">
                <span className="text-foreground text-5xl font-bold tracking-tight">
                  ${plan.default_price?.unit_amount / 100}
                </span>
              </p>

              <p className="text-muted-foreground text-xs leading-5">
                {"billed monthly"}
              </p>

              <ul className="mt-5 flex flex-col gap-2">
                {plan.marketing_features.map((feature: any, idx: any) => (
                  <li key={idx} className="flex items-center">
                    <Check className="text-primary mr-2 size-4" />
                    <span>{feature.name}</span>
                  </li>
                ))}
              </ul>

              <hr className="my-4 w-full" />

              <Link
                href={"/signup"}
                className={cn(
                  buttonVariants({
                    variant: "outline"
                  }),
                  "group relative w-full gap-2 overflow-hidden text-lg font-semibold tracking-tighter",
                  "hover:ring-primary hover:bg-primary transform-gpu ring-offset-current transition-all duration-300 ease-out hover:text-white hover:ring-2 hover:ring-offset-1",
                  plan.isPopular
                    ? "bg-primary text-white"
                    : "bg-white text-black"
                )}
              >
                Continue
              </Link>
              <p className="text-muted-foreground mt-6 text-xs leading-5">
                {plan.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  )
}
