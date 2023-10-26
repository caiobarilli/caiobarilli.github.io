import styled from 'styled-components'
import media from 'styled-media-query'

export const Wrapper = styled.div`
  width: calc(100% - 32px);
  padding-left: 3.2rem;
  padding: 1.6rem 3.2rem;

  ${media.greaterThan('medium')`
    padding: 0.6rem 3.2rem;
  `}
`
