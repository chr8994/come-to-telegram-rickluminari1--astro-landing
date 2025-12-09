"use client"

import Header from "@/components/sections/header"
import Footer from "@/components/sections/footer"
import Hero from "@/components/sections/hero"
import Logos from "@/components/sections/logos"
import Solution from "@/components/sections/solution"
import CTA from "@/components/sections/cta"
import FAQ from "@/components/sections/faq"
import HowItWorks from "@/components/sections/how-it-works"

export default function HomePage() {
  return (
    <main>
      <Header />
      <Hero />
      <Logos />
      <Solution />
      <HowItWorks />
      <FAQ />
      <CTA />
      <Footer />
    </main>
  )
}
