import { Container } from '@/components/Container'
import { useTranslation } from 'react-i18next'
import Heading from '@/components/Heading'

import * as S from './styles'
import Link from '@/components/Link'

const About = () => {
  const { t } = useTranslation()

  return (
    <S.Wrapper>
      <Container>
        <Heading color="text" size="medium">
          {t('about.title')}
          <Link url="/" size="small">
            {t('menu.Back')}
          </Link>
        </Heading>
        <S.TextWrapper
          dangerouslySetInnerHTML={{
            __html: t('about.complete_description'),
          }}
        />
      </Container>
    </S.Wrapper>
  )
}

export default About
