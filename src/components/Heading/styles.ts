import styled, { css } from 'styled-components'
import { HeadingProps } from '.'

export const WrapperModifier = {
  small: () => css`
    font-size: ${(props) => props.theme.font.sizes.xxsmall};
  `,
  medium: () => css`
    font-size: ${(props) => props.theme.font.sizes.medium};
  `,
  large: () => css`
    font-size: ${(props) => props.theme.font.sizes.xlarge};
  `
}

export const Title = styled.h2<HeadingProps>`
  ${({ theme, size, color }) => css`
    margin: 0;
    color: ${theme.colors[color!]};
    font-family: ${theme.font.family};
    font-weight: ${theme.font.bold};
    ${!!size && WrapperModifier[size]}
  `}
`
