import React, { FC } from "react"
import remarkGfm from "remark-gfm"
import remarkMath from "remark-math"
import { MessageCodeBlock } from "./message-codeblock"
import { MessageMarkdownMemoized } from "./message-markdown-memoized"
import remarkMdx from "remark-mdx"
import rehypeRaw from "rehype-raw"
import { RainbowButton } from "../ui/rainbow-button"
import { CustomBarChart } from "./templates/bar-chart"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "../ui/card"
import { Collapsible } from "../ui/collapsible"
import { CollapsibleTrigger } from "@radix-ui/react-collapsible"

interface MessageMarkdownProps {
  content: string
  messageType: string
  collapsible?: boolean
}

export const MessageMarkdown: FC<MessageMarkdownProps> = ({
  content,
  messageType,
  collapsible = false
}) => {
  return (
    <MessageMarkdownMemoized
      className={`prose dark:prose-invert prose-p:leading-relaxed prose-pre:p-0 min-w-full space-y-6 break-words`}
      remarkPlugins={[remarkGfm, remarkMath]}
      rehypePlugins={[rehypeRaw]}
      components={{
        // @ts-ignore
        "bar-chart": props => {
          return (
            <div className="flex">
              <div
                className={
                  props.size == "large"
                    ? "flex w-full"
                    : "flex max-w-sm flex-initial"
                }
              >
                <CustomBarChart
                  data={props.data}
                  title={props.title}
                  description={props.description}
                />
              </div>
            </div>
          )
        },
        // @ts-ignore
        "card-stat": props => {
          return (
            <Card x-chunk="dashboard-05-chunk-1" className="flex flex-initial">
              <CardHeader className="mt-2 px-6 pb-2">
                <CardDescription>{props.title}</CardDescription>
                <CardTitle className="text-4xl">{props.value}</CardTitle>
              </CardHeader>
              <CardContent>
                {props.subtitle ? (
                  <div className="text-muted-foreground text-xs">
                    {props.subtitle}
                  </div>
                ) : null}
              </CardContent>
              {/* <CardFooter>
                <Progress value={25} aria-label="25% increase" />
              </CardFooter> */}
            </Card>
          )
        },
        // @ts-ignore
        "grid-content": props => {
          let size = props.cols || "2"
          return (
            <div className={`grid-cols-${size} grid gap-4`}>
              {props.children}
            </div>
          )
        },
        p({ children }) {
          return <p className="mb-2 last:mb-0">{children}</p>
        },
        code({ node, className, children, ...props }) {
          const childArray = React.Children.toArray(children)
          const firstChild = childArray[0] as React.ReactElement
          const firstChildAsString = React.isValidElement(firstChild)
            ? (firstChild as React.ReactElement).props.children
            : firstChild

          if (className === "language-starbot") {
            return <div className="w-full">{firstChildAsString}</div>
          }

          if (firstChildAsString === "▍") {
            return <span className="mt-1 animate-pulse cursor-default">▍</span>
          }

          if (typeof firstChildAsString === "string") {
            childArray[0] = firstChildAsString.replace("`▍`", "▍")
          }

          const match = /language-(\w+)/.exec(className || "")

          if (
            typeof firstChildAsString === "string" &&
            !firstChildAsString.includes("\n")
          ) {
            return (
              <code className={className} {...props}>
                {childArray}
              </code>
            )
          }

          return (
            <MessageCodeBlock
              key={Math.random()}
              language={(match && match[1]) || ""}
              value={String(childArray).replace(/\n$/, "")}
              {...props}
            />
          )
        }
      }}
    >
      {content}
    </MessageMarkdownMemoized>
  )
}
