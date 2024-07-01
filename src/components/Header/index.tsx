import { Location } from '@styled-icons/evil/Location'
import { Github } from '@styled-icons/boxicons-logos/Github'
import { Linkedin } from '@styled-icons/boxicons-logos/Linkedin'
import { Whatsapp } from '@styled-icons/boxicons-logos/Whatsapp'
import { Terminal } from '@styled-icons/ionicons-outline/Terminal'
import { EmailOutline } from '@styled-icons/evaicons-outline/EmailOutline'

import Hr from '@/components/Hr'
import Text from '@/components/Text'
import Link from '@/components/Link'
import Image from '@/components/Image'
import Heading from '@/components/Heading'

import * as S from './styles'

const Header = () => {
  return (
    <>
      <S.Wrapper>
        <S.ImageWrapper>
          <Image src="/img/profile.png" mode="rounded" alt="Profile picture" />
        </S.ImageWrapper>

        <S.ContentWrapper>
          <S.Title>
            <Heading size="large">Caio Pachêco Barilli</Heading>
            <Text color="thirdText">
              Desenvolvedor FullStack - Tecnologo em sistemas para internet
            </Text>
          </S.Title>

          <S.InfoRow>
            <Text icon={<Location />} color="secondText">
              São Paulo - SP
            </Text>
            <Link
              size="medium"
              url="https://api.whatsapp.com/send?phone=5511986243016&text=Ol%C3%A1%2C%20Caio!"
            >
              <Text icon={<Whatsapp />} color="secondText">
                +55 11 98624-3016
              </Text>
            </Link>

            <Link size="medium" url="mailto:caiobarilli@gmail.com">
              <Text icon={<EmailOutline />} color="secondText">
                caiobarilli@gmail.com
              </Text>
            </Link>
          </S.InfoRow>

          <S.InfoRow>
            <Link size="medium" url="https://github.com/caiobarilli">
              <Text icon={<Github />} color="secondText">
                Github
              </Text>
            </Link>

            <Link size="medium" url="https://www.linkedin.com/in/caio-barilli/">
              <Text icon={<Linkedin />} color="secondText">
                Linkedin
              </Text>
            </Link>

            <Text icon={<Terminal />} color="secondText">
              8 Anos de experiência profissional
            </Text>
          </S.InfoRow>
        </S.ContentWrapper>
      </S.Wrapper>
      <Hr />
    </>
  )
}

export default Header
