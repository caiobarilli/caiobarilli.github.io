import Header from '@/components/Header'
import Stacks from '@/components/Stacks'
import Description from '@/components/Description'
import Experiences from '@/components/Experiences'
import { Container } from '@/components/Container'
import Education from '@/components/Education'

import * as S from './styles'

const Home = () => {
  return (
    <S.Wrapper>
      <Container>
        <Header />
        <Description />
        <Stacks />
        <Education />
        <Experiences />
      </Container>
    </S.Wrapper>
  )
}

export default Home
