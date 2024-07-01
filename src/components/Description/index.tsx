import Text from '@/components/Text'
import Hr from '@/components/Hr'

import * as S from './styles'

const Description = () => {
  return (
    <S.Wrapper>
      <S.TextWrapper>
        <Text>
          {`Olá, eu sou um desenvolvedor fullstack apaixonado por tecnologia, com quase 8 anos de experiência no mercado. Tenho formação em Sistemas para Internet pelo Centro Universitário Senac, em São Paulo.`}
        </Text>
      </S.TextWrapper>
      <Hr />
    </S.Wrapper>
  )
}
export default Description
