import styled, { css } from 'styled-components'
import media from 'styled-media-query'

export const Wrapper = styled.div`
  ${media.greaterThan('medium')`
    display: grid;
    grid-template-columns: 0fr 1fr;
    grid-template-rows: 2fr;
    grid-template-areas: 'left right';
  `}
`

export const ImageWrapper = styled.div`
  ${({ theme }) => css`
    grid-area: left;
    margin-right: ${theme.spacings.xxsmall};
    display: flex;
    align-items: flex-start;
  `}
`

export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  ${media.greaterThan('medium')`
    grid-area: right;
  `}
`

export const InfoRow = styled.div`
  ${({ theme }) => css`
    ${media.greaterThan('medium')`
      display: flex;
      p {
        margin-right: ${theme.spacings.xsmall};
      }
    `}
  `}
`
