"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { ArrowRight, Check } from "lucide-react"
import { useState } from "react"

const pricingOptions = [
  {
    name: "Free",
    price: "$0",
    yearlyPrice: "$0",
    description:
      "Let top creative talent come to you by posting your job listing on #1 Design Jobs Board."
  },
  {
    name: "Enterprise",
    price: "$499",
    yearlyPrice: "$1228",
    description:
      "Get your roles filled faster with unlimited access to Dribbble's Job Board and Designer search."
  },
  {
    name: "Pro",
    price: "$499",
    yearlyPrice: "$1228",
    description:
      "Get your roles filled faster with unlimited access to Dribbble's Job Board and Designer search.",
    features: [
      "Access to All Features",
      "20% discount on backorders",
      "Domain name Appraisal",
      "10 Social Profiles"
    ],
    extraBenefits: "Everything in free plan, plus"
  }
]

export function Pricing() {
  const [isYearly, setIsYearly] = useState(false)

  return (
    <section id="pricing">
      <div className="container mx-auto max-w-5xl p-0">
        <div className="flex items-center justify-center space-x-4">
          <span
            className={`font-bold ${
              !isYearly ? "text-foreground" : "text-muted-foreground"
            }`}
          >
            Monthly
          </span>
          <Switch checked={isYearly} onCheckedChange={setIsYearly} />
          <span
            className={`font-bold ${
              isYearly ? "text-foreground" : "text-muted-foreground"
            }`}
          >
            Yearly
          </span>
        </div>
        <div className="mx-auto mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
          {pricingOptions.map((option, index) => (
            <Card
              key={index}
              className={`flex flex-col shadow-none ${
                option.features ? "md:col-span-2" : ""
              }`}
            >
              <CardContent className="flex grow flex-col p-6 md:flex-row">
                <div
                  className={`flex flex-col ${
                    option.features ? "md:w-1/2" : "w-full"
                  }`}
                >
                  <CardTitle className="mb-2 text-2xl font-bold">
                    {option.name}
                  </CardTitle>
                  <p className="text-muted-foreground mb-4 text-sm">
                    {option.description}
                  </p>
                  <div className="mb-4 mt-auto text-4xl font-bold">
                    {isYearly ? option.yearlyPrice : option.price}
                    <span className="text-muted-foreground ml-1 text-sm font-normal">
                      {isYearly ? "/year" : "/month"}
                    </span>
                  </div>
                  <Button className="bg-primary text-primary-foreground hover:bg-primary/90 w-full">
                    Choose Plan
                    <ArrowRight className="ml-2 size-4" />
                  </Button>
                </div>
                {option.features && (
                  <div className="mt-6 md:mt-0 md:w-1/2 md:pl-6">
                    {option.extraBenefits && (
                      <p className="text-muted-foreground mb-4 text-sm">
                        {option.extraBenefits}
                      </p>
                    )}
                    {option.features.map((feature, featureIndex) => (
                      <div
                        key={featureIndex}
                        className="mb-2 flex items-center"
                      >
                        <Check className="text-primary mr-2 size-5" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
