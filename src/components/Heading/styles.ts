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
    font-size: ${(props) => props.theme.font.sizes.xxlarge};

    ${media.lessThan('medium')`
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      font-size: ${(props: any) => props.theme.font.sizes.medium};
    `}
  `,
}

export const Title = styled.h2<HeadingProps>`
  ${({ theme, size, color }) => css`
    color: ${theme.colors[color!]};
    font-family: ${theme.font.family};
    font-weight: ${theme.font.bold};
    margin: 0;

    ${!!size && WrapperModifier[size]}

    @media print {
      color: ${theme.print.colors.black};
    }
  `}
`
