import React, { createContext, useCallback, useState } from 'react'

export const ThemeContext = createContext({
  isDarkTheme: false,
  toggle: () => {}
})

export function ThemeProvider ({ children }: { children: React.ReactNode }) {
  const [isDarkTheme, setIsDarkTheme] = useState(false)

  const toggle = useCallback(() => {
    setIsDarkTheme(!isDarkTheme)
  }, [isDarkTheme])

  return <ThemeContext.Provider value={{ isDarkTheme, toggle }} >
    {children}
  </ThemeContext.Provider>
};
