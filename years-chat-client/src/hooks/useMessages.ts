import { useState, useCallback, useEffect } from 'react'
import { type Socket, io } from 'socket.io-client'
import { useAsync } from './useAsync'
import { chatRequest } from '../api/http'

export interface Message {
  sender: string
  content: string | undefined
  sentTime: Date
  edited?: Date
  deleted?: boolean
  id?: number
}

export function useMessages (username: string, setMessageBoxBalue: React.Dispatch<React.SetStateAction<string>>) {
  const [socket, setSocket] = useState<Socket | undefined>()

  useEffect(() => {
    setSocket(io('http://localhost:3021'))
  }, [])

  const [messages, setMessages] = useState<Message[]>([])
  const [editing, setEditing] = useState<number | undefined>(undefined)

  const [messageWaitingForId, setMessageWaitingForId] = useState<Message | undefined>()

  const {
    loading,
    error,
    value: chatlog
  } = useAsync(chatRequest)

  useEffect(() => {
    if (chatlog) {
      setMessages(chatlog.messages)
    }
  }, [chatlog])

  if (socket) {
    socket.on('message', (message) => {
      recieveMessage(message)
    })

    socket.on('assignId', (id: number) => {
      recieveMessageId(id)
    })
  }

  const recieveMessageId = useCallback((id: number) => {
    if (messageWaitingForId) {
      const message = {
        ...messageWaitingForId,
        id
      }
      setMessages([
        ...messages,
        message
      ])
      setMessageWaitingForId(undefined)
    }
  }, [messageWaitingForId, messages])

  const recieveMessage = useCallback((message: Message) => {
    const existingMessage = messages.findIndex(m => m.id === message.id)
    if (existingMessage >= 0) {
      const newMessages = messages
      newMessages[messages.findIndex(m => m.id === message.id)] = message
      setMessages([...newMessages])
    } else {
      setMessages([
        ...messages,
        message
      ])
    }
  }, [messages, setMessages])

  function createMessage (content: string): Message {
    return {
      sender: username,
      content,
      sentTime: new Date()
    }
  };

  const startEditing = useCallback((id: number) => {
    const messageToEdit = messages.find(m => m.id === id)
    setMessageBoxBalue(messageToEdit?.content ?? '')
    setEditing(id)
  }, [setEditing, messages])

  const deleteMessage = useCallback((id: number) => {
    const newMessages = messages
    const messageToDelete = messages.find(m => m.id === id)
    if (messageToDelete && socket) {
      const deletedMessage = {
        ...messageToDelete,
        deleted: true
      }
      newMessages[messages.findIndex(m => m.id === id)] = deletedMessage
      setMessages([...newMessages])
      socket.emit('message', deletedMessage)
    }
  }, [messages])

  const sendMessage = useCallback((content: string) => {
    if (!socket) { return }
    const message = createMessage(content)
    if (editing) {
      socket.emit('message', {
        ...message,
        edited: new Date(),
        id: editing
      })
      const newMessages = messages
      newMessages[messages.findIndex(m => m.id === editing)] = message
      setMessages(newMessages)
    } else {
      socket.emit('message', message)
      setMessageWaitingForId(message)
    }
    setEditing(undefined)
  }, [messages, editing, setMessages, socket])

  return { sendMessage, messages, loading, error, startEditing, editing, deleteMessage }
}
