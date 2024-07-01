import { createGlobalStyle, css } from 'styled-components'

const GlobalStyles = createGlobalStyle`

  @font-face {
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 300;
    src: url('/fonts/roboto-light.woff2') format('woff2');
  }

  @font-face {
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    src: url('/fonts/roboto-regular.woff2') format('woff2');
  }

  @font-face {
    font-family: 'Roboto';
    font-style: italic;
    font-weight: 400;
    src: url('/fonts/roboto-italic.woff2') format('woff2');
  }

  @font-face {
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 500;
    src: url('/fonts/roboto-medium.woff2') format('woff2');
  }

  @font-face {
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 600;
    src: url('/fonts/roboto-bold.woff2') format('woff2');
  }

  ${({ theme }) => css`
    html {
      font-size: 62.5%;
    }

    body {
      color: ${theme.colors.text};
      background-color: ${theme.colors.background};
      font-family: ${theme.font.family};
      font-weight: ${theme.font.normal};
      margin: 0;
      padding: 0;

      @media print {
        color: ${theme.print.colors.black};
        background-color: ${theme.print.colors.white};
      }
    }

    p {
      margin: 0;

  `}
`

export default GlobalStyles
