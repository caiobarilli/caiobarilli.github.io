import Image from 'components/Image'
import Heading from 'components/Heading'
import Text from 'components/Text'
import Hr from 'components/Hr'

import { Location } from '@styled-icons/evil/Location'
import { Terminal } from '@styled-icons/ionicons-outline/Terminal'
import { Briefcase } from '@styled-icons/ionicons-outline/Briefcase'
import { Phone } from '@styled-icons/boxicons-regular/Phone'
import { EmailOutline } from '@styled-icons/evaicons-outline/EmailOutline'

import { Container } from 'components/Container'

import * as S from './styles'

const Header = () => (
  <Container>
    <S.Wrapper>
      <S.ImageWrapper>
        <Image src="/img/profile.png" mode="rounded" />
      </S.ImageWrapper>
      <S.ContentWrapper>
        <>
          <Heading size="large">Caio Pachêco Barilli</Heading>
          <Text color="lightGray">DESENVOLVEDOR FRONTEND</Text>
        </>

        <S.InfoRow>
          <Text icon={<Phone />} color="gray">
            +55 11 97430 5533
          </Text>

          <Text icon={<EmailOutline />} color="gray">
            caiobarilli@gmail.com
          </Text>
        </S.InfoRow>

        <S.InfoRow>
          <Text icon={<Location />} color="gray">
            Bela Vista, São Paulo, SP
          </Text>

          <Text icon={<Terminal />} color="gray">
            7 Anos de experiência profissional
          </Text>
        </S.InfoRow>

        <S.InfoRow>
          <Text icon={<Briefcase />} color="gray">
            Freelance - Fullstack developer @ CBC
          </Text>
        </S.InfoRow>
      </S.ContentWrapper>
    </S.Wrapper>
    <Hr />
  </Container>
)

export default Header
