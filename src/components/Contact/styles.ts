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

  ${({ theme }) => css`
    a {
      margin-right: ${theme.spacings.xxsmall};
    }
  `}
`
