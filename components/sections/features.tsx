import Features from "@/components/magicui/features-horizontal"
import Section from "@/components/magicui/section"
import { BarChart3, Brain, FileText, LineChart } from "lucide-react"

const data = [
  {
    id: 1,
    title: "AI-Powered Dashboard",
    content: "Visualize trends and gain insights at a glance.",
    image: "/dashboard2.png",
    icon: <BarChart3 className="text-primary size-6" />
  },
  {
    id: 2,
    title: "Natural Language Processing",
    content: "Analyze text and extract sentiment effortlessly.",
    image: "/dashboard3.png",
    icon: <Brain className="text-primary size-6" />
  },
  {
    id: 3,
    title: "Predictive Analytics",
    content: "Forecast trends and make data-driven decisions.",
    image: "/dashboard.png",
    icon: <LineChart className="text-primary size-6" />
  },
  {
    id: 4,
    title: "Automated Reporting",
    content: "Generate comprehensive reports with one click.",
    image: "/dashboard.png",
    icon: <FileText className="text-primary size-6" />
  }
]

export default function Component() {
  return (
    <Section title="Features" subtitle="User Flows and Navigational Structures">
      <Features collapseDelay={5000} linePosition="bottom" data={data} />
    </Section>
  )
}
