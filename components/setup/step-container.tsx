import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import { FC, useRef } from "react"
import { Icons } from "../magicui/icons"

export const SETUP_STEP_COUNT = 3

interface StepContainerProps {
  stepDescription: string
  stepNum: number
  stepTitle: string
  onShouldProceed: (shouldProceed: boolean) => void
  children?: React.ReactNode
  showBackButton?: boolean
  showNextButton?: boolean
}

export const StepContainer: FC<StepContainerProps> = ({
  stepDescription,
  stepNum,
  stepTitle,
  onShouldProceed,
  children,
  showBackButton = false,
  showNextButton = true
}) => {
  const buttonRef = useRef<HTMLButtonElement>(null)

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      if (buttonRef.current) {
        buttonRef.current.click()
      }
    }
  }

  return (
    <Card
      className="h-full w-[700px] overflow-auto border-0 shadow-none"
      onKeyDown={handleKeyDown}
    >
      <CardHeader>
        <CardTitle className="relative flex justify-between font-medium">
          <div className="flex flex-row">
            <Icons.logo className="h-[40px] w-auto" logoProps={{ size: 40 }} />
            <div className="ml-4">
              {stepTitle}
              <CardDescription className="mt-1 font-normal">
                {stepDescription}
              </CardDescription>
            </div>
          </div>

          {/* <div className="text-sm">
            {stepNum} / {SETUP_STEP_COUNT}
          </div> */}
          <div className="absolute right-0 mx-auto grid max-w-[120px] grid-cols-4 justify-end gap-4 px-2">
            <div
              className={
                stepNum == 1
                  ? "bg-primary size-4 rounded-full"
                  : "size-4 rounded-full bg-gray-300"
              }
            />
            <div
              className={
                stepNum == 2
                  ? "bg-primary size-4 rounded-full"
                  : "size-4 rounded-full bg-gray-300"
              }
            />
            <div
              className={
                stepNum == 3
                  ? "bg-primary size-4 rounded-full"
                  : "size-4 rounded-full bg-gray-300"
              }
            />
          </div>
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">{children}</CardContent>

      <CardFooter className="flex justify-between">
        <div>
          {showBackButton && (
            <Button
              size="sm"
              variant="outline"
              onClick={() => onShouldProceed(false)}
            >
              Back
            </Button>
          )}
        </div>

        <div>
          {
            <Button
              ref={buttonRef}
              size="sm"
              disabled={!showNextButton}
              onClick={() => onShouldProceed(true)}
            >
              Continue
            </Button>
          }
        </div>
      </CardFooter>
    </Card>
  )
}
