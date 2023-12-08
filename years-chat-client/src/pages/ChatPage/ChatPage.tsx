import React, { useState } from 'react'
import { Flex, Spinner } from '@chakra-ui/react'
import { styles } from './style'
import { MessageBox } from '../../components/Messagebox/MessageBox'
import { ChatLog } from '../../components/ChatLog/ChatLog'
import { useMessages } from '../../hooks/useMessages'

interface ChatPageOptions {
  username: string
}

export function ChatPage ({
  username
}: ChatPageOptions) {
  const [messageBoxValue, setmessageBoxValue] = useState('')
  const { sendMessage, messages, loading, startEditing, deleteMessage } = useMessages(username, setmessageBoxValue)

  return (
    <Flex sx={styles.container}>
      {
        loading
          ? <Spinner/>
          : (messages && < ChatLog messages={messages} username={username} startEditing={startEditing} deleteMessage={deleteMessage} />)
      }
      <MessageBox
        username={username}
        sendMessage={sendMessage}
        messageBoxValue={messageBoxValue}
        setMessageBoxValue={setmessageBoxValue}
      />
    </Flex>
  )
}
