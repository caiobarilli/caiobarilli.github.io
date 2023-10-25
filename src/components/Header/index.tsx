import { useTranslation } from 'react-i18next'
import Image from '@/components/Image'
import Heading from '@/components/Heading'
import Text from '@/components/Text'
import Hr from '@/components/Hr'

import { Location } from '@styled-icons/evil/Location'
import { Terminal } from '@styled-icons/ionicons-outline/Terminal'
import { Briefcase } from '@styled-icons/ionicons-outline/Briefcase'
import { Phone } from '@styled-icons/boxicons-regular/Phone'
import { EmailOutline } from '@styled-icons/evaicons-outline/EmailOutline'

import * as S from './styles'

const Header = () => {
  const { t } = useTranslation()

  return (
    <>
      <S.Wrapper>
        <S.ImageWrapper>
          <Image src="/img/profile.png" mode="rounded" alt="Profile picture" />
        </S.ImageWrapper>

        <S.ContentWrapper>
          <S.Title>
            <Heading size="large">{t('home.header.Name')}</Heading>
            <Text color="thirdText">{t('home.header.JobTitle')}</Text>
          </S.Title>

          <S.InfoRow>
            <Text icon={<Phone />} color="secondText">
              {t('home.header.Phone')}
            </Text>

            <Text icon={<EmailOutline />} color="secondText">
              {t('home.header.Email')}
            </Text>
          </S.InfoRow>

          <S.InfoRow>
            <Text icon={<Location />} color="secondText">
              {t('home.header.Location')}
            </Text>

            <Text icon={<Terminal />} color="secondText">
              {t('home.header.Experience')}
            </Text>
          </S.InfoRow>

          <S.InfoRow>
            <Text icon={<Briefcase />} color="secondText">
              {t('home.header.Status')}
            </Text>
          </S.InfoRow>
        </S.ContentWrapper>
      </S.Wrapper>
      <Hr />
    </>
  )
}

export default Header
