import styled, { css } from 'styled-components'

export const Wrapper = styled.div`
  width: calc(100% - 32px);
  padding-left: 3.2rem;
  padding: 1.6rem 3.2rem;
`

export const TextWrapper = styled.div`
  ${({ theme }) => css`
    font-family: ${theme.font.family};
    font-weight: ${theme.font.normal};
    font-size: ${theme.font.sizes.small};
    margin-top: ${theme.spacings.xsmall};

    @media print {
      p {
        color: ${theme.print.colors.black};
      }
    }
  `}
`
