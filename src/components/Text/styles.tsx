import styled, { css } from 'styled-components'

import { TextProps } from '.'

export const WrapperModifier = {
  small: () => css`
    font-size: ${(props) => props.theme.font.sizes.xxsmall};
  `,
  medium: () => css`
    font-size: ${(props) => props.theme.font.sizes.small};
  `
}

export const Wrapper = styled.p<TextProps>`
  ${({ theme, size, color }) => css`
    display: flex;
    padding: 0.35rem 0;
    color: ${theme.colors[color!]};
    font-family: ${theme.font.family};
    font-weight: ${theme.font.normal};

    svg {
      width: 1rem;
      margin-right: 0.4rem;
    }

    ${!!size && WrapperModifier[size]}
  `}
`
