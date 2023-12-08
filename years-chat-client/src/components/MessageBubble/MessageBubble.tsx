import React, { useContext } from 'react'
import { Card, CardBody, Flex, Heading, Icon, IconButton, Text } from '@chakra-ui/react'
import dayjs from 'dayjs'
import { styles } from './style'
import { DeleteIcon, EditIcon } from '@chakra-ui/icons'
import { type Message } from '../../hooks/useMessages'
import { ThemeContext } from '../../context/ThemeProvider'

interface MessageBubbleOptions {
  message: Message
  hideSender?: boolean
  isYourMessage?: boolean
  startEditing: (id: number) => void
  deleteMessage: (id: number) => void
}

function formatDate (date: Date) {
  return dayjs(date).format('H:mm D/MM/YY')
}

export function MessageBubble ({
  message,
  hideSender,
  isYourMessage,
  startEditing,
  deleteMessage
}: MessageBubbleOptions) {
  const {
    sender,
    content,
    sentTime,
    edited,
    deleted
  } = message

  const { isDarkTheme } = useContext(ThemeContext)

  return (
    <Flex sx={{
      ...styles.container,
      ...(isYourMessage ? styles.containerYourMessage : {})
    }}>
      {!hideSender &&
      <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
        <Heading size='sm' sx={{ ...(isDarkTheme && styles.textDark) }}>{isYourMessage ? 'You' : sender}</Heading>
        <Text sx={{ ...styles.textTime, ...(isDarkTheme && styles.textDark) }}>{edited ? `Edited at ${formatDate(edited)}` : `${formatDate(sentTime)}`}</Text>
      </Flex>
      }
      <Flex>
      {isYourMessage && !message.deleted &&
      <>
        <IconButton
            size="sm"
            variant="link"
            aria-label="Edit icon"
            onClick={() => { message.id && startEditing(message.id) }}
            icon={<Icon as={EditIcon} />}
          />
        <IconButton
            size="sm"
            variant="link"
            aria-label="Delete icon"
            onClick={() => { message.id && deleteMessage(message.id) }}
            icon={<Icon as={DeleteIcon} />}
          />
        </>
      }
      <Card sx={{
        ...styles.card,
        ...(isYourMessage ? styles.cardYourMessage : {})
      }}
       size='sm'>
        <CardBody>
          <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
            <Text sx={{
              ...styles.text,
              ...(isYourMessage ? styles.textYourMessage : {})
            }}>
                {deleted ? 'This message has been deleted' : content}
            </Text>
          </Flex>
        </CardBody>
      </Card>
      </Flex>

    </Flex>
  )
}
