import { Label } from "@/components/ui/label"
import { WORKSPACE_INSTRUCTIONS_MAX } from "@/db/limits"
import { ChatSettings } from "@/types"
import { FC, useState } from "react"
import ReactTextareaAutosize from "react-textarea-autosize"
import { ChatSettingsForm } from "../ui/chat-settings-form"
import { LimitDisplay } from "../ui/limit-display"
import { Pricing } from "./pricing"
import { motion } from "framer-motion"
import { siteConfig } from "@/lib/config"
import useWindowSize from "@/lib/hooks/use-window-size"
import { cn } from "@/lib/utils"
import { IconStarFilled } from "@tabler/icons-react"
import { Check } from "lucide-react"
import Link from "next/link"
import { buttonVariants } from "@/components/ui/button"

interface SubscriptionStepProps {
  chatSettings: ChatSettings
  workspaceInstructions: string
  onChatSettingsChange: (chatSettings: ChatSettings) => void
  onWorkspaceInstructionsChange: (workspaceInstructions: string) => void
}

export const SubscriptionStep: FC<SubscriptionStepProps> = ({
  chatSettings: defaultChatSettings,
  workspaceInstructions,
  onChatSettingsChange,
  onWorkspaceInstructionsChange
}) => {
  const [isMonthly, setIsMonthly] = useState(true)
  const { isDesktop } = useWindowSize()

  const handleToggle = () => {
    setIsMonthly(!isMonthly)
  }
  return (
    <>
      <div className="space-y-1">
        <Pricing />
      </div>
    </>
  )
}
