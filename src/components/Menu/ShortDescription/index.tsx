import { useTranslation } from 'react-i18next'
import Heading from '@/components/Heading'
import Text from '@/components/Text'
import Hr from '@/components/Hr'
import Link from '@/components/Link'

import * as S from './styles'

const ShortDescription = () => {
  const { t } = useTranslation()

  return (
    <S.Wrapper>
      <Heading color="secondText" size="medium">
        {t('about.title')}
        <Link url="/about" size="small">
          {t('home.about.read_more')}
        </Link>
      </Heading>
      <S.TextWrapper>
        <Text>{t('home.about.short_description')}</Text>
      </S.TextWrapper>
      <Hr />
    </S.Wrapper>
  )
}
export default ShortDescription
