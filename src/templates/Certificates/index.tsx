import { useTranslation } from 'react-i18next'
import * as S from './styles'
import { Container } from '@/components/Container'
import Heading from '@/components/Heading'
import Link from '@/components/Link'

const Certificates = () => {
  const { t } = useTranslation()

  return (
    <S.Wrapper>
      <Container>
        <Heading color="text" size="medium">
          {t('certificates.title')}
          <Link url="/" size="small">
            {t('menu.Back')}
          </Link>
        </Heading>
        <S.TextWrapper
          dangerouslySetInnerHTML={{
            __html: t('certificates.title'),
          }}
        />
      </Container>
    </S.Wrapper>
  )
}

export default Certificates
