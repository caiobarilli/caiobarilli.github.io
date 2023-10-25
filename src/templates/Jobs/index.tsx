import { useTranslation } from 'react-i18next'
import * as S from './styles'
import { Container } from '@/components/Container'
import Heading from '@/components/Heading'
import Link from '@/components/Link'

const Jobs = () => {
  const { t } = useTranslation()

  return (
    <S.Wrapper>
      <Container>
        <Heading color="text" size="medium">
          {t('menu.Jobs')}
          <Link url="/" size="small">
            {t('menu.Back')}
          </Link>
        </Heading>
        <S.TextWrapper
          dangerouslySetInnerHTML={{
            __html: t('jobs.complete_description'),
          }}
        />
      </Container>
    </S.Wrapper>
  )
}

export default Jobs
