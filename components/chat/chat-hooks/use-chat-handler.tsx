import { ChatbotUIContext } from "@/context/context"
import {
  deleteMessagesIncludingAndAfter,
  setMessageListener
} from "@/db/messages"
import { Tables } from "@/supabase/types"
import { ChatMessage, ChatPayload } from "@/types"
import { useRouter } from "next/navigation"
import { useContext, useEffect, useRef, useState } from "react"
import { useScroll } from "../chat-hooks/use-scroll"
import { LLM_LIST } from "../../../lib/models/llm/llm-list"
import { v4 as uuidv4 } from "uuid"

import {
  createTempMessages,
  handleCreateChat,
  handleCreateMessages,
  handleCreateMessagesAuto,
  createTempMessagesAuto,
  handleHostedChat,
  handleHostedChatAuto,
  handleLocalChat,
  handleRetrieval,
  validateChatSettings,
  handleHostedChatSSE
} from "../chat-helpers"
// import {
//   StreamContentType,
//   StreamEvent,
//   StreamMessage,
//   StreamRoleType
// } from "@/app/api/chat/openai/stream/route"
import { StreamEvent, StreamSystemMessage } from "@/workers/types"

export const useChatHandler = () => {
  const router = useRouter()
  const USE_SSE = true
  const {
    userInput,
    chatFiles,
    setUserInput,
    setNewMessageImages,
    profile,
    setIsGenerating,
    setChatMessages,
    setFirstTokenReceived,
    selectedChat,
    selectedWorkspace,
    setSelectedChat,
    setChats,
    availableLocalModels,
    abortController,
    setAbortController,
    chatSettings,
    newMessageImages,
    selectedAssistant,
    chatMessages,
    chatImages,
    setChatImages,
    setChatFiles,
    setNewMessageFiles,
    setShowFilesDisplay,
    newMessageFiles,
    chatFileItems,
    setChatFileItems,
    setToolInUse,
    useRetrieval,
    sourceCount,
    setIsPromptPickerOpen,
    setIsAtPickerOpen,
    setIsThinking,
    chatHeading,
    setChatHeading
  } = useContext(ChatbotUIContext)

  const { scrollToBottom, setIsAtBottom } = useScroll()

  const chatInputRef = useRef<HTMLTextAreaElement>(null)

  const handleNewChat = () => {
    setUserInput("")
    setChatMessages([])
    setSelectedChat(null)
    setChatFileItems([])

    setIsGenerating(false)
    setFirstTokenReceived(false)

    setChatFiles([])
    setChatImages([])
    setNewMessageFiles([])
    setNewMessageImages([])
    setShowFilesDisplay(false)
    setIsPromptPickerOpen(false)
    setIsAtPickerOpen(false)
    setIsThinking(false)

    router.push("/chat")
  }

  const handleFocusChatInput = () => {
    chatInputRef.current?.focus()
  }

  const handleStopMessage = () => {
    if (abortController) {
      abortController.abort()
    }
  }

  // Add a message handler
  let tmpMessage: ChatMessage = {
    fileItems: [],
    message: {
      chat_id: chatSettings?.id || "",
      id: uuidv4(),
      heading: "",
      content: "",
      tokens: 0,
      created_at: "",
      image_paths: [],
      content_type: "",
      model: chatSettings?.model || "",
      role: "assistant",
      sequence_number: chatMessages.length,
      updated_at: "",
      user_id: ""
    }
  }
  let mapping: any = {
    action: "Action Item:",
    thought: "Thought",
    observation: "Observation",
    tool_web: "Web Browser",
    tool_search: "Search Web"
  }
  const processMessage = async (event: any) => {
    let contentToAdd: StreamSystemMessage = {
      content: ""
    }
    if (event.data) {
      let chunk: StreamEvent = JSON.parse(event.data)
      console.log("Chunk received:")
      console.log(chunk)
      setIsGenerating(true)
      setToolInUse("none")
      if (chunk.event === "message_start") {
        if (chunk) {
          let message = chunk.data
          contentToAdd = message.content
          console.log("SETTING CHAT MESSAGES")
          console.log(tmpMessage)
          // tmpMessage = chatMessages[chatMessages.length - 1];

          setChatMessages(messages => {
            let lastMessage = messages[messages.length - 1]
            if (lastMessage.message.content != "") {
              // insert as a new message
              tmpMessage.message.id = uuidv4()
              tmpMessage.message.content_type = message.content_type
              tmpMessage.message.role = message.role
              tmpMessage.message.sequence_number = messages.length + 1
              return [...messages, { ...tmpMessage }]
            }
            tmpMessage.message.content_type = message.content_type
            tmpMessage.message.role = message.role
            tmpMessage.message.sequence_number =
              lastMessage.message.sequence_number
            tmpMessage.message.id = lastMessage.message.id
            messages[messages.length - 1] = tmpMessage
            return [...messages]
          })
        }
      } else if (
        chunk.event === "message_chunk" ||
        chunk.event === "message_chunk_structured"
      ) {
        if (chunk.data.content) {
          contentToAdd = chunk.data.content
          console.log("Content to add")
          console.log(contentToAdd)
          setChatMessages(prev => {
            return [...prev].map(chatMessage => {
              if (chatMessage.message?.id === tmpMessage?.message?.id) {
                let content = chatMessage.message.content
                let heading = chatMessage.message.heading
                let contentType = chunk.data.content_type
                let role = chunk.data.role
                if (chunk.event === "message_chunk_structured") {
                  content = String(contentToAdd.content || "")
                } else {
                  content += String(contentToAdd.content || "")
                }
                heading = contentToAdd.heading || ""
                const updatedChatMessage: ChatMessage = {
                  message: {
                    ...chatMessage.message,
                    content,
                    heading,
                    content_type: contentType,
                    role
                  },
                  fileItems: chatMessage.fileItems
                }
                return { ...updatedChatMessage }
              }
              return chatMessage
            })
          })
          setFirstTokenReceived(true)
          setToolInUse("none")
        }
      } else if (chunk.event === "message_end") {
        console.log("Message end!!!!")

        // setChatMessages(messages => {
        //   let final = messages[messages.length - 1];
        //   final.message.content += contentToAdd.content;
        //   messages[messages.length - 1] = final;
        //   return [...messages];
        // })

        setIsGenerating(false)
        setFirstTokenReceived(false)
        setUserInput("")
        setNewMessageImages([])
      }
    }
  }

  const handleSendMessage = async (
    messageContent: string,
    chatMessagesTmp: ChatMessage[],
    isRegeneration: boolean
  ) => {
    const startingInput = messageContent

    // console.log("temp messages")
    // console.log(chatMessagesTmp)
    try {
      // handle autonomous agent
      if (
        chatSettings?.model == "sales-gpt" ||
        chatSettings?.model == "auto-gpt"
        // chatSettings?.model == "gpt-3.5-turbo-0125" ||
        // chatSettings?.model == "gpt-4-0125-preview"
      ) {
        setUserInput("")
        setIsGenerating(true)
        setIsPromptPickerOpen(false)
        setIsAtPickerOpen(false)

        const newAbortController = new AbortController()
        setAbortController(newAbortController)

        const modelData = [...LLM_LIST, ...availableLocalModels].find(
          llm => llm.modelId === chatSettings?.model
        )

        validateChatSettings(
          chatSettings,
          modelData,
          profile,
          selectedWorkspace,
          messageContent
        )

        let currentChat = selectedChat ? { ...selectedChat } : null

        const b64Images = newMessageImages.map(image => image.base64)

        let retrievedFileItems: Tables<"file_items">[] = []

        if (
          (newMessageFiles.length > 0 || chatFiles.length > 0) &&
          useRetrieval
        ) {
          setToolInUse("retrieval")

          retrievedFileItems = await handleRetrieval(
            userInput,
            newMessageFiles,
            chatFiles,
            chatSettings!.embeddingsProvider,
            sourceCount
          )
        }

        let generatedText = ""
        if (!currentChat) {
          // create chat immediately
          currentChat = await handleCreateChat(
            chatSettings!,
            profile!,
            selectedWorkspace!,
            messageContent,
            selectedAssistant!,
            newMessageFiles,
            setSelectedChat,
            setChats,
            setChatFiles
          )
        }

        let newSettings = { ...chatSettings }
        newSettings.id = String(currentChat.id)

        const { tempUserChatMessage } = createTempMessagesAuto(
          messageContent,
          chatMessagesTmp,
          newSettings,
          b64Images,
          isRegeneration,
          setChatMessages
        )

        // console.log("Current chat created")
        // console.log(chatSettings);

        const payload: ChatPayload = {
          chatSettings: newSettings!,
          workspaceInstructions: selectedWorkspace!.instructions || "",
          chatMessages: isRegeneration
            ? [...chatMessagesTmp]
            : [...chatMessagesTmp, tempUserChatMessage],
          assistant: selectedChat?.assistant_id ? selectedAssistant : null,
          messageFileItems: retrievedFileItems,
          chatFileItems: chatFileItems
        }

        // console.log("PAYLOAD")
        // console.log(payload)

        // console.log("BEFORE HANDLE CREATE MESASAGES")
        // console.log(chatMessages)
        // console.log(messageContent)

        scrollToBottom()
        setIsAtBottom(true)

        setIsThinking(true)
        setIsGenerating(false)
        setFirstTokenReceived(true)
        setUserInput("")
        setNewMessageImages([])

        // do not wait for back-end
        // add to the database
        await handleCreateMessagesAuto(
          chatMessages,
          currentChat,
          profile!,
          modelData!,
          messageContent,
          newMessageImages,
          isRegeneration,
          retrievedFileItems,
          setChatMessages,
          setChatFileItems,
          setChatImages
        )

        // console.log("BEFORE REQUEST")

        generatedText = await handleHostedChatAuto(
          payload,
          profile!,
          modelData!,
          isRegeneration,
          newAbortController,
          newMessageImages,
          chatImages,
          setIsGenerating,
          setFirstTokenReceived,
          setChatMessages,
          setToolInUse
        )
      } else {
        setUserInput("")
        setIsGenerating(true)
        setIsPromptPickerOpen(false)
        setIsAtPickerOpen(false)

        const newAbortController = new AbortController()
        setAbortController(newAbortController)

        const modelData = [...LLM_LIST, ...availableLocalModels].find(
          llm => llm.modelId === chatSettings?.model
        )

        validateChatSettings(
          chatSettings,
          modelData,
          profile,
          selectedWorkspace,
          messageContent
        )

        let currentChat = selectedChat ? { ...selectedChat } : null

        const b64Images = newMessageImages.map(image => image.base64)

        let retrievedFileItems: Tables<"file_items">[] = []

        if (
          (newMessageFiles.length > 0 || chatFiles.length > 0) &&
          useRetrieval
        ) {
          setToolInUse("retrieval")

          retrievedFileItems = await handleRetrieval(
            userInput,
            newMessageFiles,
            chatFiles,
            chatSettings!.embeddingsProvider,
            sourceCount
          )
        }

        let generatedText = ""

        const { tempUserChatMessage, tempAssistantChatMessage } =
          createTempMessages(
            messageContent,
            chatMessagesTmp,
            chatSettings!,
            b64Images,
            isRegeneration,
            setChatMessages
          )

        // if (modelData!.provider === "ollama") {
        //   generatedText = await handleLocalChat(
        //     payload,
        //     profile!,
        //     chatSettings!,
        //     tempAssistantChatMessage,
        //     isRegeneration,
        //     newAbortController,
        //     setIsGenerating,
        //     setFirstTokenReceived,
        //     setChatMessages,
        //     setToolInUse
        //   )
        // } else {

        if (!currentChat) {
          currentChat = await handleCreateChat(
            chatSettings!,
            profile!,
            selectedWorkspace!,
            messageContent,
            selectedAssistant!,
            newMessageFiles,
            setSelectedChat,
            setChats,
            setChatFiles
          )
        }
        if (chatSettings?.id) {
          let newSettings = chatSettings
          newSettings.id = currentChat.id

          const payload: ChatPayload = {
            chatSettings: chatSettings!,
            workspaceInstructions: selectedWorkspace!.instructions || "",
            chatMessages: isRegeneration
              ? [...chatMessagesTmp]
              : [...chatMessagesTmp, tempUserChatMessage],
            assistant: selectedChat?.assistant_id ? selectedAssistant : null,
            messageFileItems: retrievedFileItems,
            chatFileItems: chatFileItems
          }

          console.log("from currentchat non-autonomous")
          console.log(currentChat)

          if (USE_SSE) {
            generatedText = await handleHostedChatSSE(
              payload,
              profile!,
              modelData!,
              tempAssistantChatMessage,
              isRegeneration,
              newAbortController,
              newMessageImages,
              chatImages,
              setIsGenerating,
              setFirstTokenReceived,
              setChatMessages,
              setToolInUse
            )
            // setIsGenerating(false)
            setFirstTokenReceived(false)
            setUserInput("")
            setNewMessageImages([])
          } else {
            generatedText = await handleHostedChat(
              payload,
              profile!,
              modelData!,
              tempAssistantChatMessage,
              isRegeneration,
              newAbortController,
              newMessageImages,
              chatImages,
              setIsGenerating,
              setFirstTokenReceived,
              setChatMessages,
              setToolInUse
            )

            console.log("from generated text non-autonomous")
            console.log(generatedText)

            setIsGenerating(false)
            setFirstTokenReceived(false)
            setUserInput("")
            setNewMessageImages([])
          }
          // }
        }
      }
    } catch (error) {
      setIsGenerating(false)
      setFirstTokenReceived(false)
      setUserInput(startingInput)
    }
  }

  const handleSendEdit = async (
    editedContent: string,
    sequenceNumber: number
  ) => {
    if (!selectedChat) return

    await deleteMessagesIncludingAndAfter(
      selectedChat.user_id,
      selectedChat.id,
      sequenceNumber
    )

    const filteredMessages = chatMessages.filter(
      chatMessage => chatMessage.message.sequence_number < sequenceNumber
    )

    setChatMessages(filteredMessages)

    handleSendMessage(editedContent, filteredMessages, false)
  }

  return {
    chatInputRef,
    // prompt,
    handleNewChat,
    handleSendMessage,
    handleFocusChatInput,
    handleStopMessage,
    handleSendEdit,
    processMessage
  }
}
