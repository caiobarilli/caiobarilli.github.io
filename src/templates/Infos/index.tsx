import { useTranslation } from 'react-i18next'
import { Container } from '@/components/Container'
import * as S from './styles'
import Heading from '@/components/Heading'
import Link from '@/components/Link'

const Infos = () => {
  const { t } = useTranslation()

  return (
    <S.Wrapper>
      <Container>
        <Heading color="text" size="medium">
          {t('infos.title')}
          <Link url="/" size="small">
            {t('menu.Back')}
          </Link>
        </Heading>
      </Container>
    </S.Wrapper>
  )
}

export default Infos
