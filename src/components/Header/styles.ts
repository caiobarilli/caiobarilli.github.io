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
    align-items: flex-end;
    justify-content: center;

    ${media.lessThan('medium')`
      justify-content: start;
    `}
  `}
`

export const ContentWrapper = styled.div`
  display: flex;
  justify-content: center;
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

    a {
      margin: 0;
      line-height: 1rem;
      text-transform: none;

      @media print {
        display: block;
      }
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
  h2 {
    margin: 0;
    margin-bottom: 0.5rem;
    line-height: 2.5rem;
  }
`
