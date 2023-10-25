import styled from 'styled-components'

export const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  height: 100%;
`

export const MenuWrapper = styled.div`
  width: 3.2rem;
  height: 100vh;
  position: fixed;
`

export const ContentWrapper = styled.div`
  width: calc(100% - 32px);
  height: 100%;
`
