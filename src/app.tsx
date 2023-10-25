import { Outlet } from 'react-router-dom'
import { useContext } from 'react'
import { I18nextProvider } from 'react-i18next'
import { ThemeProvider } from 'styled-components'
import { lightTheme, darkTheme } from '@/styles/theme'
import GlobalStyle from '@/styles/GlobalStyles'
import i18n from '@/utils/i18n'
import { Context, ContextProvider } from '@/utils/context'
import Base from '@/templates/Base'

export default function App() {
  return (
    <ContextProvider>
      <AppWrapper />
    </ContextProvider>
  )
}

function AppWrapper() {
  const { isDarkTheme } = useContext(Context)
  return (
    <ThemeProvider theme={isDarkTheme ? darkTheme : lightTheme}>
      <GlobalStyle />
      <I18nextProvider i18n={i18n}>
        <Base>
          <Outlet />
        </Base>
      </I18nextProvider>
    </ThemeProvider>
  )
}
