import React, { useContext, useState } from 'react'
import { Heading, Flex, Textarea, Button } from '@chakra-ui/react'
import { styles } from './style'
import { ThemeContext } from '../../context/ThemeProvider'

interface MainPageOptions {
  login: (username: string) => Promise<void>
}

export function MainPage ({
  login
}: MainPageOptions) {
  const [value, setValue] = useState('')

  const handleInputChange = (e: any) => {
    const inputValue = e.target.value
    setValue(inputValue)
  }

  const { isDarkTheme } = useContext(ThemeContext)

  return (
    <Flex sx={styles.container}>
      <Flex sx={styles.content}>
      <Heading as='h2' size='2xl' sx={{ ...(isDarkTheme && styles.textDark) }}>
        Welcome to YearsChat!
      </Heading>
      <Heading as='h4' size='xl' sx={{ ...(isDarkTheme && styles.textDark) }} >
        Please enter your name below and press Log in.
      </Heading>
      <Textarea
        sx={{ ...(isDarkTheme && styles.textDark) }}
        value={value}
        onChange={handleInputChange}
        placeholder='Name'
        size='sm'
      />
      <Button
        colorScheme='blue'
        onClick={() => { login(value) }}
        >
        Log In
      </Button>
      </Flex>
    </Flex>
  )
}
