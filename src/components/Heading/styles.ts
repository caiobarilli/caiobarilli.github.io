/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-non-null-assertion */

import styled, { css } from 'styled-components'
import media from 'styled-media-query'
import { HeadingProps } from '.'

export const WrapperModifier = {
  small: () => css`
    font-size: ${(props) => props.theme.font.sizes.xsmall};
  `,
  medium: () => css`
    font-size: ${(props) => props.theme.font.sizes.medium};
  `,
  large: () => css`
    font-size: ${(props) => props.theme.font.sizes.large};

    ${media.lessThan('medium')`
      font-size: ${(props: any) => props.theme.font.sizes.medium};
    `}
  `,
}

export const Title = styled.h2<HeadingProps>`
  ${({ theme, size, color }) => css`
    color: ${theme.colors[color!]};
    font-family: ${theme.font.family};
    font-weight: ${theme.font.bold};

    ${!!size && WrapperModifier[size]}

    @media print {
      color: ${theme.print.colors.black};
    }
  `}
`
