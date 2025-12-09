"use client"

import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, Rectangle, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from "@/components/ui/chart"

export const description = "A bar chart with an active bar"

const chartData = [
  { browser: "jan", visitors: 187, fill: "var(--color-jan)" },
  { browser: "feb", visitors: 200, fill: "var(--color-feb)" },
  { browser: "mar", visitors: 275, fill: "var(--color-mar)" },
  { browser: "apr", visitors: 173, fill: "var(--color-apr)" },
  { browser: "may", visitors: 90, fill: "var(--color-may)" }
]

const chartConfig = {
  visitors: {
    label: "Sales"
  },
  jan: {
    label: "Jan",
    color: "hsl(var(--chart-1))"
  },
  feb: {
    label: "Feb",
    color: "hsl(var(--chart-2))"
  },
  mar: {
    label: "Mar",
    color: "hsl(var(--chart-3))"
  },
  apr: {
    label: "Apr",
    color: "hsl(var(--chart-4))"
  },
  may: {
    label: "May",
    color: "hsl(var(--chart-5))"
  }
} satisfies ChartConfig

export function ChartExample() {
  return (
    <Card className="m-0 border-0 bg-transparent">
      <CardContent className="mt-4 px-6">
        <ChartContainer config={chartConfig} className="h-[200px] w-full">
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="browser"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={value =>
                chartConfig[value as keyof typeof chartConfig]?.label
              }
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar
              dataKey="visitors"
              strokeWidth={2}
              radius={8}
              activeIndex={2}
              activeBar={({ ...props }) => {
                return (
                  <Rectangle
                    {...props}
                    fillOpacity={0.8}
                    stroke={props.payload.fill}
                    strokeDasharray={4}
                    strokeDashoffset={4}
                  />
                )
              }}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 px-6 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Sales trending up by 5.2% this month <TrendingUp className="size-4" />
        </div>
        <div className="text-muted-foreground leading-none">
          Showing total contracts for the last 6 months
        </div>
      </CardFooter>
    </Card>
  )
}
