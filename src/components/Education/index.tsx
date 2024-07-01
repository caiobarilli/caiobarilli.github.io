import Heading from '@/components/Heading'
import Image from '@/components/Image'
import Text from '@/components/Text'

import { Location } from '@styled-icons/evil/Location'

import * as S from './styles'

const Education = () => {
  return (
    <>
      <S.Wrapper>
        <Heading color="secondText">Formação:</Heading>

        <S.WrapperItem>
          <S.WrapperItemTitle>
            <S.ImageWrapper>
              <Image
                src="/img/logos/logo-senac.jpg"
                alt="Logo"
                mode="borderRadius"
              />
            </S.ImageWrapper>

            <S.WrapperContentTitle>
              <Heading size="small" color="secondText">
                Centro Universitário Senac - Curso Superior de Tecnologia (CST)
              </Heading>

              <Text color="thirdText">
                {`Agosto de 2012 - junho de 2015 · Presencial`}
              </Text>

              <S.InfoRow>
                <Text icon={<Location />} color="secondText">
                  São Paulo, Brasil
                </Text>
              </S.InfoRow>
            </S.WrapperContentTitle>
          </S.WrapperItemTitle>
        </S.WrapperItem>
      </S.Wrapper>

      <hr />
    </>
  )
}

export default Education
