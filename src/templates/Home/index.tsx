import { Container } from '@/components/Container'
import Header from '@/components/Header'
import ShortDescription from '@/components/ShortDescription'
import Stacks from '@/components/Stacks'
import Experiences from '@/components/Experiences'

import * as S from './styles'

const Home = () => {
  return (
    <S.Wrapper>
      <Container>
        <Header />
        <ShortDescription />
        <Stacks />
        <Experiences />
      </Container>
    </S.Wrapper>
  )
}

export default Home
