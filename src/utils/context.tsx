import React, { createContext, useState, useEffect } from 'react'
import { getStorageItem, setStorageItem } from '@/utils/localStorage'
import { isDarkMode } from '@/utils'

const THEME_COLOR_KEY = 'darkTheme'

export interface ContextProps {
  isDarkTheme: boolean
  toggleTheme: () => void
}

export const Context = createContext<ContextProps>({
  isDarkTheme: false,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  toggleTheme: () => {},
})

interface ProviderProps {
  children: React.ReactNode
}

export const ContextProvider: React.FunctionComponent<ProviderProps> = ({
  children,
}) => {
  const [isDarkTheme, setIsDarkTheme] = useState(false)

  useEffect(() => {
    const data = getStorageItem(THEME_COLOR_KEY)

    if (data !== null) {
      setIsDarkTheme(data)
    } else {
      if (isDarkMode()) setIsDarkTheme(true)
    }
  }, [])

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme)
    setStorageItem(THEME_COLOR_KEY, !isDarkTheme)
  }

  return (
    <Context.Provider value={{ isDarkTheme, toggleTheme }}>
      {children}
    </Context.Provider>
  )
}
