import { exportLocalStorageAsJSON } from "@/lib/export-old-data"
import { ContentType } from "@/types"
import {
  IconAd2,
  IconAddressBook,
  IconAdjustmentsHorizontal,
  IconBooks,
  IconBuildingCommunity,
  IconBuildingBank,
  IconBuildingStore,
  IconChartHistogram,
  IconFile,
  IconFileDownload,
  IconFileText,
  IconFolderUp,
  IconInbox,
  IconMessage,
  IconPencil,
  IconRobotFace,
  IconTool,
  IconHeart,
  IconTableHeart,
  IconHomeHeart
} from "@tabler/icons-react"
import { FC, use } from "react"
import { TabsList, TabsTrigger } from "../ui/tabs"
import { WithTooltip } from "../ui/with-tooltip"
import { ProfileSettings } from "../utility/profile-settings"
import { SidebarSwitchItem } from "./sidebar-switch-item"
import { StarfleetLogo } from "../icons/starfleet-logo"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"

export const SIDEBAR_ICON_SIZE = 26

interface SidebarSwitcherProps {
  onContentTypeChange: (contentType: ContentType) => void
}

export const SidebarSwitcher: FC<SidebarSwitcherProps> = ({
  onContentTypeChange
}) => {
  const router = useRouter()

  return (
    <div className="flex flex-col justify-between border-r-2 pb-5">
      <TabsList className="bg-secondary grid h-[500px] grid-rows-10">
        <SidebarSwitchItem
          style={{ padding: "8px", marginBottom: "10px" }}
          icon={<StarfleetLogo size={SIDEBAR_ICON_SIZE + 10} />}
          contentType="chats"
          onContentTypeChange={() => {}}
        />

        {/* <SidebarSwitchItem
          icon={<IconBuildingBank size={SIDEBAR_ICON_SIZE} />}
          contentType="accounts"
          onContentTypeChange={() => {}}
          onPress={() => {
            router.push("/accounts?tab=accounts")
          }}
        /> */}

        {/* <SidebarSwitchItem
          icon={<IconChartHistogram size={SIDEBAR_ICON_SIZE} />}
          contentType="insights"
          onContentTypeChange={() => {
            router.push("/contacts?tab=contacts")
          }}
        /> */}
        <WithTooltip
          display={<div>Insights</div>}
          trigger={
            <div
              className={cn(
                "ring-offset-background focus-visible:ring-ring data-[state=active]:bg-background data-[state=active]:text-foreground inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:shadow-sm",
                "hover:opacity-50"
              )}
              onClick={() => router.push("/contacts?tab=accounts")}
            >
              <IconChartHistogram size={SIDEBAR_ICON_SIZE} />
            </div>
          }
        />

        {/* <WithTooltip
          display={<div>Product Comparison</div>}
          trigger={
            <div
              className={cn(
                "ring-offset-background focus-visible:ring-ring data-[state=active]:bg-background data-[state=active]:text-foreground inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:shadow-sm",
                "hover:opacity-50"
              )}
              onClick={() => router.push("/favorites?tab=accounts")}
            >
              <IconHomeHeart size={SIDEBAR_ICON_SIZE} />
            </div>
          }
        /> */}

        <WithTooltip
          display={<div>Builder Insights</div>}
          trigger={
            <div
              className={cn(
                "ring-offset-background focus-visible:ring-ring data-[state=active]:bg-background data-[state=active]:text-foreground inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:shadow-sm",
                "hover:opacity-50"
              )}
              onClick={() => router.push("/builders/models?tab=accounts")}
            >
              <IconBuildingCommunity size={SIDEBAR_ICON_SIZE} />
            </div>
          }
        />

        {/* <SidebarSwitchItem
          icon={<IconAd2 size={SIDEBAR_ICON_SIZE} />}
          contentType="marketing"
          onContentTypeChange={() => {
            router.push("/marketing?tab=accounts")
          }}
        /> */}

        {/* <WithTooltip
          display={<div>Marketing</div>}
          trigger={
            <div
              className={cn(
                "ring-offset-background focus-visible:ring-ring data-[state=active]:bg-background data-[state=active]:text-foreground inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:shadow-sm",
                "hover:opacity-50"
              )}
              onClick={() => router.push("/marketing?tab=accounts")}
            >
              <IconBuildingStore size={SIDEBAR_ICON_SIZE} />
            </div>
          }
        /> */}

        {/* <SidebarSwitchItem
          icon={<IconInbox size={SIDEBAR_ICON_SIZE} />}
          contentType="files"
          onContentTypeChange={() => {
            router.push("/mail?tab=mail")
          }}
        /> */}

        <SidebarSwitchItem
          icon={<IconFolderUp size={SIDEBAR_ICON_SIZE} />}
          contentType="files"
          onContentTypeChange={onContentTypeChange}
        />

        {/* <SidebarSwitchItem
          icon={<IconAdjustmentsHorizontal size={SIDEBAR_ICON_SIZE} />}
          contentType="presets"
          onContentTypeChange={onContentTypeChange}
        /> */}

        {/* <SidebarSwitchItem
          icon={<IconPencil size={SIDEBAR_ICON_SIZE} />}
          contentType="prompts"
          onContentTypeChange={onContentTypeChange}
        /> */}

        {/* 
        <SidebarSwitchItem
          icon={<IconBooks size={SIDEBAR_ICON_SIZE} />}
          contentType="collections"
          onContentTypeChange={onContentTypeChange}
        /> */}

        <SidebarSwitchItem
          icon={<IconMessage size={SIDEBAR_ICON_SIZE} />}
          contentType="chats"
          onContentTypeChange={onContentTypeChange}
        />

        {/* TODO */}
        <SidebarSwitchItem
          icon={<IconRobotFace size={SIDEBAR_ICON_SIZE} />}
          contentType="assistants"
          onContentTypeChange={onContentTypeChange}
        />

        {/* <SidebarSwitchItem
          icon={<IconTool size={SIDEBAR_ICON_SIZE} />}
          contentType="accounts"
          onContentTypeChange={() => {}}
        /> */}

        {/* <SidebarSwitchItem
          icon={<IconBooks size={SIDEBAR_ICON_SIZE} />}
          contentType="accounts"
          onContentTypeChange={() => {
            router.push("/knowledge?tab=accounts")
          }}
        /> */}
        <WithTooltip
          display={<div>Knowledge</div>}
          trigger={
            <div
              className={cn(
                "ring-offset-background focus-visible:ring-ring data-[state=active]:bg-background data-[state=active]:text-foreground inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:shadow-sm",
                "hover:opacity-50"
              )}
              onClick={() => router.push("/knowledge?tab=accounts")}
            >
              <IconBooks size={SIDEBAR_ICON_SIZE} />
            </div>
          }
        />
      </TabsList>

      <div className="flex flex-col items-center space-y-4">
        {/* TODO */}
        {/* <WithTooltip display={<div>Import</div>} trigger={<Import />} /> */}

        {/* TODO */}
        {/* <Alerts /> */}

        <WithTooltip
          display={
            <div>Download Chatbot UI 1.0 data as JSON. Import coming soon!</div>
          }
          trigger={
            <IconFileDownload size={32} onClick={exportLocalStorageAsJSON} />
          }
        />

        <WithTooltip
          display={<div>Profile Settings</div>}
          trigger={<ProfileSettings />}
        />
      </div>
    </div>
  )
}
