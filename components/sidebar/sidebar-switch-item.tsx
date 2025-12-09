import { ContentType } from "@/types"
import { FC } from "react"
import { TabsTrigger } from "../ui/tabs"
import { WithTooltip } from "../ui/with-tooltip"
import { useRouter } from "next/navigation"

interface SidebarSwitchItemProps {
  contentType: ContentType
  icon: React.ReactNode
  style?: any
  onContentTypeChange: (contentType: ContentType) => void
  onPress?: () => void
}

export const SidebarSwitchItem: FC<SidebarSwitchItemProps> = ({
  contentType,
  icon,
  onContentTypeChange,
  style,
  onPress
}) => {
  return (
    <WithTooltip
      display={
        <div>{contentType[0].toUpperCase() + contentType.substring(1)}</div>
      }
      trigger={
        <TabsTrigger
          className="hover:opacity-50"
          value={contentType}
          style={style}
          onClick={() =>
            onPress
              ? onPress()
              : onContentTypeChange(contentType as ContentType)
          }
        >
          {icon}
        </TabsTrigger>
      }
    />
  )
}
