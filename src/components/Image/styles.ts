import styled, { css } from 'styled-components'
import { ImageProps } from '.'

export const Wrapper = styled.div`
  width: fit-content;
  overflow: hidden;
`

export const ImageModifier = {
  rounded: () => css`
    width: 9.5rem;
    height: auto;
    border-radius: ${(props) => props.theme.border.rounded};
  `,
  borderRadius: () => css`
    width: 5.5rem;
    height: auto;
    border-radius: ${(props) => props.theme.border.radius};
  `,
}

export const Image = styled.img<ImageProps>`
  ${({ mode }) => css`
    ${!!mode && ImageModifier[mode]}
  `}
`
