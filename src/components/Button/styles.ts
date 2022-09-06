import styled, { css } from 'styled-components'

export const Wrapper = styled.button`
  ${({ theme }) => css`
    width: fit-content;
    color: ${theme.colors.white};
    background-color: ${theme.colors.darkGray};
    font-family: ${theme.font.family};

    margin: 0;
    padding: calc(${theme.spacings.xxxsmall} / 2) ${theme.spacings.xxxsmall};
    display: table;

    border: 0;
    border-radius: ${theme.border.radius};
    text-decoration: none;
    line-height: 1rem;
  `}
`
