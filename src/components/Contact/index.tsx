import Button from 'components/Button'
import Heading from 'components/Heading'
import Hr from 'components/Hr'

import { Container } from 'components/Container'
import { Github } from '@styled-icons/boxicons-logos/Github'
import { LinkedinWithCircle } from '@styled-icons/entypo-social/LinkedinWithCircle'
import { Instagram } from '@styled-icons/simple-icons/Instagram'
import { Twitter } from '@styled-icons/boxicons-logos/Twitter'
import * as S from './styles'

const Contact = () => (
  <Container>
    <S.Wrapper>
      <Heading color="gray" size="small">
        Contato
      </Heading>

      <S.ButtonsWrapper>
        <Button
          as="a"
          href="https://github.com/caiobarilli"
          target="_blank"
          icon={<Github />}
        >
          Github
        </Button>

        <Button
          as="a"
          href="https://www.linkedin.com/in/caiobarilli/"
          target="_blank"
          icon={<LinkedinWithCircle />}
        >
          Linkedin
        </Button>

        <Button
          as="a"
          href="https://www.instagram.com/caiobarilli/"
          target="_blank"
          icon={<Instagram />}
        >
          Instagram
        </Button>

        <Button
          as="a"
          href="https://twitter.com/CaioBarilli"
          target="_blank"
          icon={<Twitter />}
        >
          Twitter
        </Button>
      </S.ButtonsWrapper>

      <Hr />
    </S.Wrapper>
  </Container>
)

export default Contact
