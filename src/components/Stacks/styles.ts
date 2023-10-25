import styled, { css } from 'styled-components'

export const Wrapper = styled.div`
  ${({ theme }) => css`
    h2 {
      margin-bottom: ${theme.spacings.xsmall};
    }
  `}
`

export const ButtonsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: flex-start;

  ${({ theme }) => css`
    button {
      margin: 0 ${theme.spacings.xxsmall} ${theme.spacings.xxsmall} 0;

      @media print {
        margin: 0 0.25rem 0.5rem;
      }

      p {
        svg {
          width: 2rem;
          height: 2rem;
        }
      }
    }
  `}
`
