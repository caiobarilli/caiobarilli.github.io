import Button from '@/components/Button'
import Heading from '@/components/Heading'
import Hr from '@/components/Hr'

import { Github } from '@styled-icons/boxicons-logos/Github'
import { Youtube } from '@styled-icons/boxicons-logos/Youtube'
import { Whatsapp } from '@styled-icons/bootstrap/Whatsapp'

import * as S from './styles'

const Contact = () => {
  return (
    <S.Wrapper>
      <Heading color="secondText" size="small">
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
          href="https://www.youtube.com/channel/UC3Ajsu80AZ5bvkm91sZNDiQ"
          target="_blank"
          icon={<Youtube />}
        >
          Youtube
        </Button>

        <Button
          as="a"
          href="https://api.whatsapp.com/send?phone=5511986243016"
          target="_blank"
          icon={<Whatsapp />}
        >
          Whatsapp
        </Button>
      </S.ButtonsWrapper>

      <Hr />
    </S.Wrapper>
  )
}

export default Contact
