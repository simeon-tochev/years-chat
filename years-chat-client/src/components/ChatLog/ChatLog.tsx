import React from 'react'
import { Flex } from '@chakra-ui/react'
import { styles } from './style'
import { MessageBubble } from '../MessageBubble/MessageBubble'
import { type Message } from '../../hooks/useMessages'

interface ChatLogOptions {
  messages?: Message[]
  username: string
  startEditing: (id: number) => void
  deleteMessage: (id: number) => void
}

export function ChatLog ({
  messages = [],
  username,
  startEditing,
  deleteMessage
}: ChatLogOptions) {
  return (
    <Flex sx={styles.container}>
      {messages.map((message, index) => {
        return <MessageBubble
          key={index}
          message={message}
          hideSender={index > 0 && messages[index - 1].sender === message.sender}
          isYourMessage={message.sender === username}
          startEditing={startEditing}
          deleteMessage={deleteMessage}
          />
      })}
    </Flex>
  )
}
