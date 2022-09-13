import Heading from 'components/Heading'
import Text from 'components/Text'
import Hr from 'components/Hr'

import { Container } from 'components/Container'

import * as S from './styles'

const About = () => (
  <Container>
    <S.Wrapper>
      <Heading color="gray" size="small">
        Sobre
      </Heading>
      <Text>
        Sou um profissional com experiência na área, formado em Sistemas para
        Internet pelo Centro Universitário SENAC, capaz de desenvolver projetos
        em equipe e com facilidade de adequação a mudanças.
      </Text>
      <Hr />
    </S.Wrapper>
  </Container>
)

export default About
