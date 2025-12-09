import { ChatSettingsForm } from "@/components/ui/chat-settings-form"
import ImagePicker from "@/components/ui/image-picker"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ChatbotUIContext } from "@/context/context"
import { ASSISTANT_DESCRIPTION_MAX, ASSISTANT_NAME_MAX } from "@/db/limits"
import { Tables } from "@/supabase/types"
import { IconRobotFace } from "@tabler/icons-react"
import Image from "next/image"
import React, { FC, useContext, useEffect, useState } from "react"
import profile from "react-syntax-highlighter/dist/esm/languages/hljs/profile"
import { SidebarItem } from "../all/sidebar-display-item"

interface AssistantItemProps {
  assistant: Tables<"assistants">
}

export const AssistantItem: FC<AssistantItemProps> = ({ assistant }) => {
  const { selectedWorkspace, assistantImages } = useContext(ChatbotUIContext)

  const [name, setName] = useState(assistant.name)
  const [description, setDescription] = useState(assistant.description)
  const [assistantChatSettings, setAssistantChatSettings] = useState({
    model: assistant.model,
    prompt: assistant.prompt,
    temperature: assistant.temperature,
    contextLength: assistant.context_length,
    includeProfileContext: assistant.include_profile_context,
    includeWorkspaceInstructions: assistant.include_workspace_instructions
  })
  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const [imageLink, setImageLink] = useState("")

  useEffect(() => {
    const assistantImage =
      assistantImages.find(image => image.path === assistant.image_path)
        ?.base64 || ""

    setImageLink(assistantImage)
  }, [assistantImages])

  if (!profile) return null
  if (!selectedWorkspace) return null

  return (
    <SidebarItem
      item={assistant}
      contentType="assistants"
      icon={
        // imageLink ? (
        //   <Image
        //     className="rounded"
        //     src={imageLink}
        //     alt={assistant.name}
        //     width={30}
        //     height={30}
        //   />
        // ) : (
        //   <IconRobotFace
        //     className="bg-primary text-secondary border-primary rounded border-[1px] p-1"
        //     size={30}
        //   />
        // )
        <div className="relative">
          {/* <img class="w-10 h-10 rounded-full" src="/docs/images/people/profile-picture-5.jpg" alt=""> */}
          <IconRobotFace
            className="bg-primary text-secondary border-primary rounded border p-1"
            size={30}
          />
          {assistant.assistant_status == "active" ? (
            <span className="absolute bottom-5 left-6  size-3.5 rounded-full border-2 border-white bg-green-400 dark:border-gray-800"></span>
          ) : assistant.assistant_status == "stopped" ? (
            <span className="absolute bottom-5 left-6  size-3.5 rounded-full border-2 border-white bg-gray-400 dark:border-gray-800"></span>
          ) : (
            <span className="absolute bottom-5 left-6  size-3.5 rounded-full border-2 border-white bg-orange-400 dark:border-gray-800"></span>
          )}
        </div>
      }
      updateState={{
        image: selectedImage,
        user_id: assistant.user_id,
        chat_id: assistant.chat_id,
        name,
        description,
        include_profile_context: assistantChatSettings.includeProfileContext,
        include_workspace_instructions:
          assistantChatSettings.includeWorkspaceInstructions,
        context_length: assistantChatSettings.contextLength,
        model: assistantChatSettings.model,
        image_path: assistant.image_path,
        prompt: assistantChatSettings.prompt,
        temperature: assistantChatSettings.temperature
      }}
      renderInputs={() => (
        <>
          <div className="space-y-1">
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
          </div>

          {/* <div className="space-y-1">
            <Label>Files</Label>

            <div>Coming soon...</div>
          </div>

          <div className="space-y-1">
            <Label>Tools</Label>

            <div>Coming soon...</div>
          </div> */}

          <ChatSettingsForm
            chatSettings={assistantChatSettings as any}
            onChangeChatSettings={setAssistantChatSettings}
            useAdvancedDropdown={true}
          />
        </>
      )}
    />
  )
}
