import { ChatSettingsForm } from "@/components/ui/chat-settings-form"
import ImagePicker from "@/components/ui/image-picker"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ChatbotUIContext } from "@/context/context"
import { ASSISTANT_DESCRIPTION_MAX, ASSISTANT_NAME_MAX } from "@/db/limits"
import { Tables } from "@/supabase/types"
import { IconBuildingBank, IconRobotFace } from "@tabler/icons-react"
import Image from "next/image"
import React, { FC, useContext, useEffect, useState } from "react"
import profile from "react-syntax-highlighter/dist/esm/languages/hljs/profile"
import { SidebarItem } from "../all/sidebar-display-item"

interface AccountItemProps {
  account: Tables<"finance_accounts">
}

export const AccountItem: FC<AccountItemProps> = ({ account }) => {
  const { selectedWorkspace, assistantImages } = useContext(ChatbotUIContext)

  const [name, setName] = useState(account.name)
  const [description, setDescription] = useState(account.official_name)
  //   const [assistantChatSettings, setAssistantChatSettings] = useState({
  //     model: assistant.model,
  //     prompt: assistant.prompt,
  //     temperature: assistant.temperature,
  //     contextLength: assistant.context_length,
  //     includeProfileContext: assistant.include_profile_context,
  //     includeWorkspaceInstructions: assistant.include_workspace_instructions
  //   })
  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const [imageLink, setImageLink] = useState("")

  //   useEffect(() => {
  //     const assistantImage =
  //       assistantImages.find(image => image.path === assistant.image_path)
  //         ?.base64 || ""

  //     setImageLink(assistantImage)
  //   }, [assistantImages])

  if (!profile) return null
  if (!selectedWorkspace) return null

  return (
    <SidebarItem
      item={account}
      contentType="accounts"
      icon={
        <div className="relative">
          {/* <img class="w-10 h-10 rounded-full" src="/docs/images/people/profile-picture-5.jpg" alt=""> */}
          <IconBuildingBank
            className="bg-primary text-secondary border-primary rounded border p-1"
            size={30}
          />
        </div>
      }
      updateState={{
        name,
        description
      }}
      renderInputs={() => (
        <>
          {/* <div className="space-y-1">
            <Label>Image</Label>

            <ImagePicker
              src={imageLink}
              image={selectedImage}
              onSrcChange={setImageLink}
              onImageChange={setSelectedImage}
              width={100}
              height={100}
            />
          </div>

          <div className="space-y-1">
            <Label>Name</Label>

            <Input
              placeholder="Assistant name..."
              value={name}
              onChange={e => setName(e.target.value)}
              maxLength={ASSISTANT_NAME_MAX}
            />
          </div>

          <div className="space-y-1">
            <Label>Description (optional)</Label>

            <Input
              placeholder="Assistant description..."
              value={description}
              onChange={e => setDescription(e.target.value)}
              maxLength={ASSISTANT_DESCRIPTION_MAX}
            />
          </div> */}

          {/* <div className="space-y-1">
            <Label>Files</Label>

            <div>Coming soon...</div>
          </div>

          <div className="space-y-1">
            <Label>Tools</Label>

            <div>Coming soon...</div>
          </div> */}

          {/* <ChatSettingsForm
            chatSettings={assistantChatSettings as any}
            onChangeChatSettings={setAssistantChatSettings}
            useAdvancedDropdown={true}
          /> */}
        </>
      )}
    />
  )
}
