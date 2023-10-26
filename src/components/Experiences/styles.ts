import styled, { css } from 'styled-components'
import media from 'styled-media-query'

export const Wrapper = styled.div``

export const WrapperTitle = styled.div`
  margin-bottom: 1rem;
`

export const WrapperExperience = styled.div``

export const WrapperItem = styled.div`
  display: grid;
  grid-template-columns: 0fr 1fr;
  grid-template-rows: 2fr;
  grid-template-areas: 'left right';
  margin-top: 2rem;

  @media print {
    margin-top: 0.5rem;
  }
`

export const ImageWrapper = styled.div`
  ${({ theme }) => css`
    margin-right: ${theme.spacings.xsmall};
    display: flex;
    align-items: flex-start;
    grid-area: left;
  `}
`

export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;

  h2 {
    font-size: 1.65rem;
  }

  ${media.greaterThan('medium')`
    grid-area: right;
  `}
`

export const InfoRow = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: row;
    align-items: center;
    flex-wrap: wrap;

    p {
      line-height: 1rem;
      margin: 0.65rem 0;

      ${media.lessThan('medium')`
        line-height: 1.85rem;
        flex-wrap: nowrap;
        align-items: start;
      `}

      @media print {
        margin: 0 0 0.35rem;
      }

      &:first-child {
        margin-right: ${theme.spacings.xsmall};
      }

      svg {
        width: 1.5rem;
        height: 1.5rem;
      }
    }
  `}
`
