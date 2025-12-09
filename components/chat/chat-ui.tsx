import Loading from "@/app/loading"
import { useChatHandler } from "@/components/chat/chat-hooks/use-chat-handler"
import { ChatbotUIContext } from "@/context/context"
import { getChatById } from "@/db/chats"
import { getFileById } from "@/db/files"
import { getMessageFileItemsByMessageId } from "@/db/message-file-items"
import { getMessagesByChatId, setMessageListener } from "@/db/messages"
import { getMessageImageFromStorage } from "@/db/storage/message-images"
import { convertBlobToBase64 } from "@/lib/blob-to-b64"
import useHotkey from "@/lib/hooks/use-hotkey"
import { LLMID, MessageImage, ChatMessage } from "@/types"
import { useParams } from "next/navigation"
import React, { FC, useCallback, useContext, useEffect, useState } from "react"
import { ChatHelp } from "./chat-help"
import { useScroll } from "./chat-hooks/use-scroll"
import { ChatInput } from "./chat-input"
import { ChatMessages } from "./chat-messages"
import { ChatScrollButtons } from "./chat-scroll-buttons"
import { ChatSecondaryButtons } from "./chat-secondary-buttons"
import {
  IconCircleFilled,
  IconBrain,
  IconHandStop,
  IconPlayerStopFilled,
  IconClockStop
} from "@tabler/icons-react"
import { WithTooltip } from "../ui/with-tooltip"

interface ChatUIProps {}

export const ChatUI: FC<ChatUIProps> = ({}) => {
  useHotkey("o", () => handleNewChat())

  const params = useParams()

  const {
    setChatMessages,
    chatMessages,
    chatSettings,
    selectedChat,
    setSelectedChat,
    setChatSettings,
    setChatImages,
    assistants,
    setSelectedAssistant,
    setChatFileItems,
    chatFiles,
    setChatFiles,
    setShowFilesDisplay,
    setUseRetrieval,
    isThinking,
    setIsThinking,
    selectedAssistant
  } = useContext(ChatbotUIContext)

  const { handleNewChat, handleFocusChatInput } = useChatHandler()

  const {
    messagesStartRef,
    messagesEndRef,
    handleScroll,
    scrollToBottom,
    setIsAtBottom,
    isAtTop,
    isAtBottom,
    isOverflowing,
    scrollToTop
  } = useScroll()

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      await fetchMessages()
      await fetchChat()

      scrollToBottom()
      setIsAtBottom(true)
    }
    if (params.chatid) {
      fetchData().then(async () => {
        handleFocusChatInput()
        setLoading(false)
      })
    } else {
      setLoading(false)
    }
  }, [])

  const fetchMessages = async () => {
    const fetchedMessages = await getMessagesByChatId(params.chatid as string)

    const imagePromises: Promise<MessageImage>[] = fetchedMessages.flatMap(
      message =>
        message.image_paths
          ? message.image_paths.map(async imagePath => {
              const url = await getMessageImageFromStorage(imagePath)

              if (url) {
                const response = await fetch(url)
                const blob = await response.blob()
                const base64 = await convertBlobToBase64(blob)

                return {
                  messageId: message.id,
                  path: imagePath,
                  base64,
                  url,
                  file: null
                }
              }

              return {
                messageId: message.id,
                path: imagePath,
                base64: "",
                url,
                file: null
              }
            })
          : []
    )

    const images: MessageImage[] = await Promise.all(imagePromises.flat())
    setChatImages(images)

    const messageFileItemPromises = fetchedMessages.map(
      async message => await getMessageFileItemsByMessageId(message.id)
    )

    const messageFileItems = await Promise.all(messageFileItemPromises)

    const uniqueFileItems = messageFileItems.flatMap(item => item.file_items)
    setChatFileItems(uniqueFileItems)

    const uniqueFileIds = [
      ...new Set(uniqueFileItems.map(item => item.file_id))
    ]

    if (uniqueFileIds.length > 0) {
      const fileFetchPromises = uniqueFileIds.map(async fileId => {
        const file = await getFileById(fileId)
        return file
      })

      const files = await Promise.all(fileFetchPromises)
      setChatFiles(
        files.map(file => ({
          id: file.id,
          name: file.name,
          type: file.type,
          file: null
        }))
      )

      setUseRetrieval(true)
      setShowFilesDisplay(true)
    } else {
      setUseRetrieval(false)
      setShowFilesDisplay(false)
      setChatFiles([])
    }

    const fetchedChatMessages = fetchedMessages.map(message => {
      return {
        message,
        fileItems: messageFileItems
          .filter(messageFileItem => messageFileItem.id === message.id)
          .flatMap(messageFileItem =>
            messageFileItem.file_items.map(fileItem => fileItem.id)
          )
      }
    })

    setChatMessages(fetchedChatMessages)
  }

  const fetchChat = async () => {
    const chat = await getChatById(params.chatid as string)
    if (!chat) return

    if (chat.assistant_id) {
      const assistant = assistants.find(
        assistant => assistant.id === chat.assistant_id
      )

      if (assistant) {
        setSelectedAssistant(assistant)
      }
    }

    setSelectedChat(chat)
    setChatSettings({
      id: chat.id,
      model: chat.model as LLMID,
      prompt: chat.prompt,
      temperature: chat.temperature,
      contextLength: chat.context_length,
      includeProfileContext: chat.include_profile_context,
      includeWorkspaceInstructions: chat.include_workspace_instructions,
      embeddingsProvider: chat.embeddings_provider as "openai" | "local"
    })
  }

  if (loading) {
    return <Loading />
  }

  return (
    <div className="relative flex h-full flex-col items-center">
      <div className="absolute left-4 top-2.5 flex justify-center">
        <ChatScrollButtons
          isAtTop={isAtTop}
          isAtBottom={isAtBottom}
          isOverflowing={isOverflowing}
          scrollToTop={scrollToTop}
          scrollToBottom={scrollToBottom}
        />
      </div>

      <div className="absolute right-4 top-1 flex h-[40px] items-center space-x-2">
        <ChatSecondaryButtons />
      </div>

      <div className="bg-secondary flex max-h-[50px] min-h-[50px] w-full items-center justify-center border-b-2 px-20 font-bold">
        <div className="max-w-[300px] truncate sm:max-w-[400px] md:max-w-[500px] lg:max-w-[600px] xl:max-w-[700px]">
          {selectedChat?.name || "Chat"}
        </div>
      </div>

      <div
        className="flex size-full flex-col overflow-auto border-b"
        onScroll={handleScroll}
      >
        <div ref={messagesStartRef} />

        <ChatMessages />

        {chatMessages.length == 0 ? (
          <div className="container left-0 h-auto max-h-[300px] w-full max-w-screen-md justify-self-center overflow-auto rounded-xl">
            <div className="grid grid-cols-2 gap-2">
              {/* Prompt Example */}
              <div className="h-20 cursor-pointer rounded-xl border-2 p-4 hover:opacity-50">
                <div className="text-md text-primary font-semibold">
                  Quick Start
                </div>
                <div className="text-muted-foreground text-xs">
                  Get started with a quick tutorial
                </div>
              </div>
              {/* Prompt Example */}
              <div className="h-20 cursor-pointer rounded-xl border-2 p-4 hover:opacity-50">
                <div className="text-md text-primary font-semibold">
                  Creative SAMI Idea
                </div>
                <div className="text-muted-foreground text-xs">
                  Generate a creative marketing initiative to help drive traffic
                </div>
              </div>
              {/* Prompt Example */}
              <div className="h-20 cursor-pointer rounded-xl border-2 p-4 hover:opacity-50">
                <div className="text-md text-primary font-semibold">
                  Business Plan Prep
                </div>
                <div className="text-muted-foreground text-xs">
                  Help me generate a killer business plan presentation
                </div>
              </div>
              {/* Prompt Example */}
              <div className="h-20 cursor-pointer rounded-xl border-2 p-4 hover:opacity-50">
                <div className="text-md text-primary font-semibold">
                  Market Research
                </div>
                <div className="text-muted-foreground text-xs">
                  Help me identify my target consumer group
                </div>
              </div>
            </div>
          </div>
        ) : null}

        {!selectedAssistant ? (
          (selectedChat?.model == "sales-gpt" ||
            selectedChat?.model == "auto-gpt" ||
            selectedChat?.model == "gpt-4-0125-preview" ||
            selectedChat?.model == "gpt-3.5-turbo-0125") &&
          isThinking ? (
            <div className={"bg-secondary flex w-full justify-center"}>
              <div
                className={`relative flex w-[300px] flex-col py-6 sm:w-[400px] md:w-[500px] lg:w-[600px] xl:w-[700px]`}
              >
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    {/* <IconCircleFilled className="animate-pulse" size={20} /> */}
                    <IconBrain className="animate-pulse" size={20} />
                    <div className="text-md text-primary font-semibold">
                      Thinking...
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : null
        ) : (
          <div className={"bg-secondary flex w-full justify-center"}>
            <div
              className={`relative flex w-[300px] flex-col py-6 sm:w-[400px] md:w-[500px] lg:w-[600px] xl:w-[700px]`}
            >
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  {/* <IconCircleFilled className="animate-pulse" size={20} /> */}

                  {selectedAssistant.assistant_status == "active" ? (
                    <React.Fragment>
                      <IconBrain className="animate-pulse" size={20} />
                      <div className="absolute right-10">
                        <WithTooltip
                          delayDuration={0}
                          side="top"
                          display={<div>Stop assistant</div>}
                          trigger={
                            <div
                              className="cursor-pointer rounded-full border-2 p-1 hover:opacity-50"
                              onClick={() => {
                                console.log("stop")
                              }}
                            >
                              <IconPlayerStopFilled size={18} />
                            </div>
                          }
                        />
                      </div>
                      <div className="text-md text-primary font-semibold">
                        Working...
                      </div>
                    </React.Fragment>
                  ) : selectedAssistant.assistant_status == "pending" ? (
                    <React.Fragment>
                      <div className="animate-pulse">
                        <IconClockStop className="inline-block" size={20} />
                        <div className="text-md text-primary ml-2 inline-block font-semibold">
                          Stop request sent.
                        </div>
                      </div>
                    </React.Fragment>
                  ) : (
                    <React.Fragment>
                      <IconHandStop className="animate-pulse" size={20} />
                      <div className="text-md text-primary font-semibold">
                        Stopped.
                      </div>
                    </React.Fragment>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="relative w-[300px] items-end pb-8 pt-5 sm:w-[400px] md:w-[500px] lg:w-[660px] xl:w-[800px]">
        <ChatInput />
      </div>

      <div className="absolute bottom-2 right-2 hidden md:block lg:bottom-4 lg:right-4">
        <ChatHelp />
      </div>
    </div>
  )
}
