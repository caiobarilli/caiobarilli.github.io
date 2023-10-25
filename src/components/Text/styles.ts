import styled, { css } from 'styled-components'

import { TextProps } from '.'

export const WrapperModifier = {
  small: () => css`
    font-size: ${(props) => props.theme.font.sizes.small};
  `,
  medium: () => css`
    font-size: ${(props) => props.theme.font.sizes.medium};
  `,
}

export const Wrapper = styled.p<TextProps>`
  ${({ theme, size, color }) => css`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-content: center;
    align-items: center;
    color: ${theme.colors[color!]};
    font-family: ${theme.font.family};
    font-weight: ${theme.font.normal};
    margin-bottom: 0.5rem;

    svg {
      width: 1rem;
      margin-right: 0.4rem;
    }

    ${!!size && WrapperModifier[size]}

    @media print {
      color: ${theme.print.colors.black};
    }
  `}
`

export const IconWrapper = styled.span``

export const TextWrapper = styled.span``
