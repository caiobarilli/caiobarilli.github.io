import {
  css,
  DefaultTheme,
  createGlobalStyle,
  GlobalStyleComponent
} from 'styled-components'

export type GlobalStylesProps = {
  removeBg?: boolean
  theme: DefaultTheme
}

const GlobalStyles: GlobalStyleComponent<
  GlobalStylesProps,
  DefaultTheme
> = createGlobalStyle`

  @font-face {
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 300;
    src: url('/fonts/roboto-light.woff2') format('woff2')
  }

  @font-face {
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    src: url('/fonts/roboto-regular.woff2') format('woff2')
  }

  @font-face {
    font-family: 'Roboto';
    font-style: italic;
    font-weight: 400;
    src: url('/fonts/roboto-italic.woff2') format('woff2')
  }

  @font-face {
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 600;
    src: url('/fonts/roboto-bold.woff2') format('woff2')
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    &::after,
    &::before {
      box-sizing: inherit;
    }
  }

  body {
    ${({ theme }) => css`
      padding: ${theme.spacings.xsmall} 0;
      color: ${theme.colors.white};
      background-color: ${theme.colors.black};
    `}
  }
`

export default GlobalStyles
