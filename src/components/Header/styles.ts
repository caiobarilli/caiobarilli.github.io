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
    margin-right: ${theme.spacings.xsmall};
    display: flex;
    align-items: flex-start;
    justify-content: center;
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
    p {
      margin-right: ${theme.spacings.xsmall};
      line-height: 1rem;
    }

    ${media.greaterThan('medium')`
      display: flex;

      p {
        svg {
          width: 1.7rem;
          height: 1.7rem;
        }
      }
    `}

    ${media.lessThan('medium')`
      p {
        display: block;
        margin-bottom: .85rem;

        svg {

          margin-top: -0.35rem;
          width: 1.45rem;
          height: 1.45rem;
        }
      }
    `}
  `}
`

export const Title = styled.div`
  margin-bottom: 1rem;
`
