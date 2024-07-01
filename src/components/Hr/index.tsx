import styled, { css } from 'styled-components'

export const HrStyled = styled.hr`
  ${({ theme }) => css`
    width: 100%;
    border: 0;
    border-bottom: 0.1rem solid ${theme.colors.secondText};
    margin: 1rem 0;
    padding: 0 0;
  `}
`

const Hr = () => <HrStyled />

export default Hr
