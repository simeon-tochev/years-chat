import React, { useContext } from 'react'
import { Heading, Flex, Button, IconButton, Icon } from '@chakra-ui/react'
import { style } from './style'
import { MoonIcon, SunIcon } from '@chakra-ui/icons'
import { ThemeContext } from '../../context/ThemeProvider'

interface HeaderOptions {
  username?: string
  logout: () => void
}

export function Header ({
  username,
  logout
}: HeaderOptions) {
  const { isDarkTheme, toggle } = useContext(ThemeContext)

  return (
    <Flex sx={{
      ...style.container,
      ...(isDarkTheme && style.containerDark)
    }}>
      <Flex>
      <Heading sx={style.titleText}>
        YearsChat
      </Heading>
      <IconButton
            size="sm"
            variant="link"
            aria-label="Edit icon"
            onClick={toggle}
            icon={<Icon as={isDarkTheme ? SunIcon : MoonIcon} color={isDarkTheme ? 'white' : 'gray'} />}
          />
      </Flex>
      {username
        ? <>
        <Heading sx={style.titleText}>
          Logged in as {username}
        </Heading>
        <Button onClick={logout}>
          Log Out
        </Button>
      </>
        : <></>
      }
    </Flex>
  )
}
