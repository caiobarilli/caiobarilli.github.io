import styled, { css } from 'styled-components'

export const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 0fr 1fr;
  grid-template-rows: 2fr;
  grid-template-areas: 'left right';
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
  grid-area: right;
  display: flex;
  flex-direction: column;
`

export const InfoRow = styled.div`
  ${({ theme }) => css`
    display: flex;

    p {
      margin-right: ${theme.spacings.xsmall};
    }
  `}
`
