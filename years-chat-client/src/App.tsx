import React, { useCallback, useContext, useEffect, useState } from 'react'
import { MainPage } from './pages/MainPage/MainPage'
import { ChatPage } from './pages/ChatPage/ChatPage'
import { Header } from './components/Header/Header'
import { loginRequest } from './api/http'
import { useAsyncAction } from './hooks/useAsyncAction'
import { Flex } from '@chakra-ui/react'
import { styles } from './style'
import { ThemeContext } from './context/ThemeProvider'

function App () {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [currentUser, setCurrentUser] = useState('')

  const { trigger: triggerLogin, value: loginResponse, clearValue } = useAsyncAction(loginRequest)

  const { isDarkTheme } = useContext(ThemeContext)

  useEffect(() => {
    const storedUser = localStorage.getItem('username')
    if (storedUser) {
      triggerLogin(storedUser)
    }
  }, [])

  useEffect(() => {
    if (loginResponse) {
      setCurrentUser((loginResponse).username)
      localStorage.setItem('username', (loginResponse).username)
      setIsLoggedIn(true)
      clearValue()
    }
  }, [loginResponse, setCurrentUser, setIsLoggedIn])

  const logout = useCallback(() => {
    setCurrentUser('')
    setIsLoggedIn(false)
    localStorage.removeItem('username')
  }, [setCurrentUser, setIsLoggedIn, currentUser])

  return <Flex sx={{ ...styles.container, ...(isDarkTheme && styles.containerDark) }}>
    <Header username={currentUser} logout={logout} />
    {isLoggedIn
      ? <ChatPage username={currentUser} />
      : <MainPage login={triggerLogin} />
    }
    </Flex>
}

export default App
