"use client"

import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts"

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
import { useEffect, useState } from "react"

// const chartData = []

// const chartConfig = {
//   desktop: {
//     label: "Desktop",
//     color: "hsl(var(--chart-1))",
//   },
// } satisfies ChartConfig

export function CustomBarChart({ data, title, description }: any) {
  const [chartData, setChartData] = useState([])
  const [chartConfig, setChartConfig] = useState({})

  useEffect(() => {
    if (data) {
      console.log("rendering chart")
      console.log(data)
      let values = JSON.parse(data)
      let tmp: any = {}
      tmp["value"] = {
        label: "Value",
        // color: `#e7b701`
        color: `hsl(var(--chart-1))`
      }
      let tmpData = values.map((val: any, idx: any) => {
        let tmpVal: any = {}
        tmpVal["label"] = val.label
        tmpVal["value"] = parseInt(val.value) || 0
        console.log(val)
        return tmpVal
      })
      setChartData(tmpData)
      setChartConfig(tmp)
    }
  }, [data])

  if (!data) return null
  return (
    <Card className="relative w-full px-0">
      <CardHeader>
        <CardTitle className="text-md mt-0">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{
              top: 10
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="label"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={value => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="value" fill="var(--color-value)" radius={8}>
              <LabelList
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="size-4" />
        </div>
        <div className="text-muted-foreground leading-none">
          Showing total visitors for the last 6 months
        </div>
      </CardFooter>
    </Card>
  )
}
