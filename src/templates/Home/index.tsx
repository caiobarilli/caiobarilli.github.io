import Header from '@/components/Header'
import Stacks from '@/components/Stacks'
import Description from '@/components/Description'
import Experiences from '@/components/Experiences'
import { Container } from '@/components/Container'

import * as S from './styles'

const Home = () => {
  return (
    <S.Wrapper>
      <Container>
        <Header />
        <Description />
        <Stacks />
        <Experiences />
      </Container>
    </S.Wrapper>
  )
}

export default Home
