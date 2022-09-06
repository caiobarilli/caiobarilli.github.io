import styled, { css } from 'styled-components'
import { ImageProps } from '.'

export const Wrapper = styled.div`
  width: fit-content;
  overflow: hidden;
`

export const ImageModifier = {
  rounded: () => css`
    width: 8rem;
    height: 8rem;
    border-radius: ${(props) => props.theme.border.rounded};
  `,
  borderRadius: () => css`
    width: 3rem;
    height: 3rem;
    border-radius: ${(props) => props.theme.border.radius};
  `
}

export const Image = styled.img<ImageProps>`
  ${({ mode }) => css`
    ${!!mode && ImageModifier[mode]}
  `}
`
