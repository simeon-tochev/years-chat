import { Button, Flex, Input, InputGroup } from '@chakra-ui/react'
import React, { useContext } from 'react'
import { styles } from './style'
import { ThemeContext } from '../../context/ThemeProvider'

interface MessageBoxOptions {
  username: string
  sendMessage: (content: string) => void
  messageBoxValue: string
  setMessageBoxValue: React.Dispatch<React.SetStateAction<string>>
}

export function MessageBox ({
  sendMessage,
  messageBoxValue,
  setMessageBoxValue
}: MessageBoxOptions) {
  const handleInputChange = (e: any) => {
    const inputValue = e.target.value
    setMessageBoxValue(inputValue)
  }

  const { isDarkTheme } = useContext(ThemeContext)

  return (
    <Flex sx={styles.container}>
      <InputGroup size='md'>
        <Input
          pr='1rm'
          value={messageBoxValue}
          onChange={handleInputChange}
          placeholder='Type your message here...'
          size='md'
          sx={{ ...(isDarkTheme && styles.textDark) }}
        />
      </InputGroup>
      <Button
            colorScheme='blue'
            sx={styles.sendMessageButton}
            onClick={() => {
              sendMessage(messageBoxValue)
              setMessageBoxValue('')
            }}
          >
            Send message
          </Button>
    </Flex>
  )
}
