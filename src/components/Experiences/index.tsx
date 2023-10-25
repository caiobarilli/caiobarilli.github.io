// import { useTranslation } from 'react-i18next'
import Heading from '@/components/Heading'
import Image from '@/components/Image'
import Text from '@/components/Text'
// import Link from '@/components/Link'

import { Location } from '@styled-icons/evil/Location'
import { Briefcase } from '@styled-icons/ionicons-outline/Briefcase'
import { Stack } from '@styled-icons/bootstrap/Stack'

import * as S from './styles'

const Experiences = () => {
  // const { t } = useTranslation()

  return (
    <S.Wrapper>
      <Heading color="secondText" size="medium">
        Experiências
        {/* <Link url="/jobs" size="small">
          {t('home.about.read_more')}
        </Link> */}
      </Heading>

      <S.WrapperExperience>
        <S.WrapperItem>
          <S.ImageWrapper>
            <Image
              src="/img/logos/logo-7.jpeg"
              alt="Logo CTC"
              mode="borderRadius"
            />
          </S.ImageWrapper>
          <S.ContentWrapper>
            <>
              <Heading size="small" color="secondText">
                CTC
              </Heading>
              <Text color="thirdText">
                abr de 2020 - dez de 2020 · 10 meses
              </Text>
            </>

            <S.InfoRow>
              <Text icon={<Briefcase />} color="secondText">
                Desenvolvedor Fullstack
              </Text>
              <Text icon={<Location />} color="secondText">
                Home Office
              </Text>
            </S.InfoRow>

            <S.InfoRow>
              <Text icon={<Stack />} color="secondText">
                Linux · Git · Docker · CakePHP · Laravel · Reactjs · WordPress ·
                JavaScript
              </Text>
            </S.InfoRow>
          </S.ContentWrapper>
        </S.WrapperItem>

        <S.WrapperItem>
          <S.ImageWrapper>
            <Image
              src="/img/logos/logo-6.jpeg"
              alt="Logo Zebra Deluxe Comunicação"
              mode="borderRadius"
            />
          </S.ImageWrapper>
          <S.ContentWrapper>
            <>
              <Heading size="small" color="secondText">
                Zebra Deluxe Comunicação
              </Heading>
              <Text color="thirdText">
                abr de 2019 - mar de 2020 · 1 ano 2 meses
              </Text>
            </>

            <S.InfoRow>
              <Text icon={<Briefcase />} color="secondText">
                Desenvolvedor front-end
              </Text>
              <Text icon={<Location />} color="secondText">
                São Paulo, Brasil
              </Text>
            </S.InfoRow>

            <S.InfoRow>
              <Text icon={<Stack />} color="secondText">
                PHP · Laravel · WordPress · MySQL · jQuery · JavaScript · SASS
              </Text>
            </S.InfoRow>
          </S.ContentWrapper>
        </S.WrapperItem>

        <S.WrapperItem>
          <S.ImageWrapper>
            <Image
              src="/img/logos/logo-4.jpeg"
              alt="Logo Shape Web Agência de Internet"
              mode="borderRadius"
            />
          </S.ImageWrapper>
          <S.ContentWrapper>
            <>
              <Heading size="small" color="secondText">
                Shape Web Agência de Internet
              </Heading>
              <Text color="thirdText">set de 2018 - dez de 2018 · 4 meses</Text>
            </>

            <S.InfoRow>
              <Text icon={<Briefcase />} color="secondText">
                Desenvolvedor Fullstack
              </Text>
              <Text icon={<Location />} color="secondText">
                Campo Grande, Mato Grosso do Sul, Brasil
              </Text>
            </S.InfoRow>

            <S.InfoRow>
              <Text icon={<Stack />} color="secondText">
                PHP · Git · MySQL · HTML5 · jQuery · SASS
              </Text>
            </S.InfoRow>
          </S.ContentWrapper>
        </S.WrapperItem>

        <S.WrapperItem>
          <S.ImageWrapper>
            <Image
              src="/img/logos/logo-3.jpeg"
              alt="Logo 123Carros"
              mode="borderRadius"
            />
          </S.ImageWrapper>
          <S.ContentWrapper>
            <>
              <Heading size="small" color="secondText">
                123Carros
              </Heading>
              <Text color="thirdText">fev de 2018 - ago de 2018 · 9 meses</Text>
            </>

            <S.InfoRow>
              <Text icon={<Briefcase />} color="secondText">
                Desenvolvedor front-end
              </Text>

              <Text icon={<Location />} color="secondText">
                São Paulo, Brasil
              </Text>
            </S.InfoRow>

            <S.InfoRow>
              <Text icon={<Stack />} color="secondText">
                Laravel · Git · SASS · jQuery
              </Text>
            </S.InfoRow>
          </S.ContentWrapper>
        </S.WrapperItem>

        <S.WrapperItem>
          <S.ImageWrapper>
            <Image
              src="/img/logos/logo-2.jpeg"
              alt="Logo Capital Mídia"
              mode="borderRadius"
            />
          </S.ImageWrapper>
          <S.ContentWrapper>
            <>
              <Heading size="small" color="secondText">
                Capital Mídia
              </Heading>
              <Text color="thirdText">
                fev de 2016 - out de 2017 · 1 ano 9 meses
              </Text>
            </>

            <S.InfoRow>
              <Text icon={<Briefcase />} color="secondText">
                Programador web
              </Text>

              <Text icon={<Location />} color="secondText">
                São Paulo, Brasil
              </Text>
            </S.InfoRow>

            <S.InfoRow>
              <Text icon={<Stack />} color="secondText">
                PHP · Git · WordPress · HTML5 · CSS · jQuery · JavaScript
              </Text>
            </S.InfoRow>
          </S.ContentWrapper>
        </S.WrapperItem>

        <S.WrapperItem>
          <S.ImageWrapper>
            <Image
              src="/img/logos/logo-1.jpeg"
              alt="Logo VAD - Estúdio Multimídia"
              mode="borderRadius"
            />
          </S.ImageWrapper>
          <S.ContentWrapper>
            <>
              <Heading size="small" color="secondText">
                VAD - Estúdio Multimídia
              </Heading>
              <Text color="thirdText">jul de 2012 - dez de 2012 · 6 meses</Text>
            </>

            <S.InfoRow>
              <Text icon={<Briefcase />} color="secondText">
                Programador junior
              </Text>

              <Text icon={<Location />} color="secondText">
                São Paulo, Brasil
              </Text>
            </S.InfoRow>

            <S.InfoRow>
              <Text icon={<Stack />} color="secondText">
                HTML · CSS · jQuery · JavaScript
              </Text>
            </S.InfoRow>
          </S.ContentWrapper>
        </S.WrapperItem>
      </S.WrapperExperience>
    </S.Wrapper>
  )
}

export default Experiences
