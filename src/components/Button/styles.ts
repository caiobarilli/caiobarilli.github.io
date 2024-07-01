import styled, { css } from 'styled-components'

export const Wrapper = styled.button`
  ${({ theme }) => css`
    width: fit-content;
    background-color: ${theme.colors.buttonPillBackground};
    font-family: ${theme.font.family};

    margin: 0 0 0.05rem 0.08rem;
    padding: calc(${theme.spacings.xxsmall} / 2) ${theme.spacings.xxsmall};
    display: table;

    border: 0;
    border-radius: ${theme.border.radius};
    text-decoration: none;
    line-height: 1rem;

    p {
      margin: 0;
    }

    @media print {
      color: ${theme.print.colors.black};
      background-color: ${theme.print.colors.white};
      border: 0.1rem solid ${theme.print.colors.black};
      border-radius: ${theme.border.radius};
    }
  `}
`
