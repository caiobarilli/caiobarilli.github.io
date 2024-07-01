import styled, { css } from 'styled-components'

import { LinkProps } from '.'

export const WrapperModifier = {
  small: () => css`
    font-size: ${(props) => props.theme.font.sizes.xxsmall};
  `,
  medium: () => css`
    font-size: ${(props) => props.theme.font.sizes.xsmall};
  `,
}

export const Wrapper = styled.a<LinkProps>`
  ${({ theme, size }) => css`
    display: inline-block;
    font-family: ${theme.font.family};
    font-weight: ${theme.font.medium};
    color: ${theme.colors.text};
    margin-left: ${theme.spacings.xxsmall};
    text-transform: uppercase;
    text-decoration: none;
    ${!!size && WrapperModifier[size]}

    @media print {
      display: none;
    }
  `}
`
