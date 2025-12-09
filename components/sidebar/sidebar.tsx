import { ChatbotUIContext } from "@/context/context"
import { Tables } from "@/supabase/types"
import { ContentType } from "@/types"
import { FC, useContext, useState } from "react"
import { SIDEBAR_WIDTH } from "../ui/dashboard"
import { TabsContent } from "../ui/tabs"
import { WorkspaceSwitcher } from "../utility/workspace-switcher"
import { WorkspaceSettings } from "../workspace/workspace-settings"
import { SidebarContent } from "./sidebar-content"
import { Mail } from "./inbox/mail"
import { useMail } from "./inbox/useMail"
import { accounts as inboxes, mails } from "./inbox/data"
import { AccountSwitcher } from "./inbox/components/account-switcher"

interface SidebarProps {
  contentType: ContentType
  showSidebar: boolean
}

export const Sidebar: FC<SidebarProps> = ({ contentType, showSidebar }) => {
  const {
    folders,
    chats,
    presets,
    prompts,
    files,
    collections,
    assistants,
    accounts
  } = useContext(ChatbotUIContext)

  const chatFolders = folders.filter(folder => folder.type === "chats")
  const presetFolders = folders.filter(folder => folder.type === "presets")
  const promptFolders = folders.filter(folder => folder.type === "prompts")
  const filesFolders = folders.filter(folder => folder.type === "files")
  const collectionFolders = folders.filter(
    folder => folder.type === "collection"
  )
  const assistantFolders = folders.filter(
    folder => folder.type === "assistants"
  )
  const accountFolders = folders.filter(folder => folder.type === "account")

  const renderSidebarContent = (
    contentType: ContentType,
    data: any[],
    folders: Tables<"folders">[]
  ) => {
    console.log("Rendering sidebar content")
    console.log(contentType)
    console.log(data)
    return (
      <SidebarContent contentType={contentType} data={data} folders={folders} />
    )
  }

  const [isCollapsed, setIsCollapsed] = useState(false)
  const [mail] = useMail()
  let sidebar_width =
    contentType == "mail" ? SIDEBAR_WIDTH + 100 : SIDEBAR_WIDTH
  return contentType == "mail" ? (
    <Mail
      accounts={inboxes}
      mails={mails}
      defaultLayout={[]}
      defaultCollapsed={false}
      navCollapsedSize={4}
    />
  ) : (
    <TabsContent
      className="m-0 w-full space-y-2"
      style={{
        // Sidebar - SidebarSwitcher
        minWidth: showSidebar ? `calc(${sidebar_width}px - 60px)` : "0px",
        maxWidth: showSidebar ? `calc(${sidebar_width}px - 60px)` : "0px",
        width: showSidebar ? `calc(${sidebar_width}px - 60px)` : "0px"
      }}
      value={contentType}
    >
      <div className="flex h-full flex-col p-3">
        <div className="flex items-center border-b-2 pb-2">
          <WorkspaceSwitcher />

          <WorkspaceSettings />
        </div>

        {(() => {
          switch (contentType) {
            case "chats":
              return renderSidebarContent("chats", chats, chatFolders)

            case "presets":
              return renderSidebarContent("presets", presets, presetFolders)

            case "prompts":
              return renderSidebarContent("prompts", prompts, promptFolders)

            case "files":
              return renderSidebarContent("files", files, filesFolders)

            case "collections":
              return renderSidebarContent(
                "collections",
                collections,
                collectionFolders
              )

            case "assistants":
              return renderSidebarContent(
                "assistants",
                assistants,
                assistantFolders
              )

            case "accounts":
              return renderSidebarContent("accounts", accounts, accountFolders)

            default:
              return null
          }
        })()}
      </div>
    </TabsContent>
  )
}
