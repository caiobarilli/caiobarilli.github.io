import styled, { css } from 'styled-components'

export const Wrapper = styled.div`
  ${({ theme }) => css`
    padding-top: ${theme.spacings.xxsmall};

    h2 {
      margin: 0;
      font-size: 1.65rem;
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
        margin: 0;

        svg {
          width: 2rem;
          height: 2rem;
        }
      }
    }
  `}
`
