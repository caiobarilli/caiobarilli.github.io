import styled, { css } from 'styled-components'

export const Wrapper = styled.div`
  ${({ theme }) => css`
    h2 {
      margin-bottom: ${theme.spacings.xxsmall};
    }
  `}
`
