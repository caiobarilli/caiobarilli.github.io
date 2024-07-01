import styled, { css } from 'styled-components'
import media from 'styled-media-query'

export const Wrapper = styled.div``

export const WrapperTitle = styled.div`
  margin-bottom: 1rem;
`

export const WrapperItem = styled.div`
  margin-bottom: 2rem;
`

export const WrapperItemTitle = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 0.55rem;

  h2 {
    font-size: 1.65rem;
    margin: 0;
  }

  p {
    margin: 0;
  }
`
export const WrapperContentTitle = styled.div`
  display: flex;
  flex-direction: column;
`

export const WrapperStacks = styled.div``

export const ImageWrapper = styled.div`
  margin-right: 0.75rem;
  display: flex;
  align-items: flex-start;
  grid-area: left;
`

export const InfoRow = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: row;
    align-items: center;
    flex-wrap: wrap;

    p {
      line-height: 1rem;
      margin: 0;

      ${media.lessThan('medium')`
        line-height: 1.85rem;
        flex-wrap: nowrap;
        align-items: start;
      `}

      @media print {
        margin: 0 0 0.35rem;
      }

      &:first-child {
        margin-right: ${theme.spacings.xxsmall};
      }

      svg {
        width: 1.5rem;
        height: 1.5rem;
      }
    }
  `}
`

export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 0.75rem;

  h2 {
    font-size: 1.65rem;
    margin: 0;
  }

  p {
    margin: 0;
    margin-bottom: 0.5rem;
  }
`
