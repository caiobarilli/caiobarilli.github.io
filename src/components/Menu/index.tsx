import { useState, useContext } from 'react'
import { Context } from '@/utils/context'
import { useTranslation } from 'react-i18next'
// import { svgFlag } from '@/utils'
import Link from '@/components/Link'
import * as S from './styles'

import { Menu as MenuIcon } from '@styled-icons/boxicons-regular/Menu'
import { Printer } from '@styled-icons/feather/Printer'
import { LightbulbFill } from '@styled-icons/bootstrap/LightbulbFill'
import { LightbulbOff } from '@styled-icons/bootstrap/LightbulbOff'

const Menu = () => {
  const { t } = useTranslation()
  const { toggleTheme, isDarkTheme } = useContext(Context)

  // let flag
  // const language = i18n.language
  const [menuIsOpen, setMenuIsOpen] = useState<boolean | undefined>(undefined)
  // const [isPtBr, setIsPtBr] = useState(language === 'pt-BR' ? true : false)

  // switch (language) {
  //   case 'pt-BR':
  //     flag = svgFlag('en')
  //     break
  //   case 'en':
  //     flag = svgFlag('pt-BR')
  //     break
  //   default:
  //     flag = svgFlag('en')
  //     break
  // }

  const toggleMenu = () => {
    setMenuIsOpen(menuIsOpen === undefined ? true : !menuIsOpen)
    return
  }

  const printHandler = () => {
    window.print()
    return
  }

  // function changeLanguage() {
  //   setIsPtBr(!isPtBr)
  //   isPtBr ? i18n.changeLanguage('en') : i18n.changeLanguage('pt-BR')
  //   return
  // }

  return (
    <S.Wrapper>
      <S.wrapperButtons>
        <S.sideMenuButton onClick={toggleMenu}>
          <MenuIcon />
        </S.sideMenuButton>

        {/*
        <S.sideMenuButton
          onClick={() => {
            changeLanguage()
          }}
        >
          {flag}
        </S.sideMenuButton>
        */}

        <S.sideMenuButton onClick={printHandler}>
          <Printer />
        </S.sideMenuButton>

        <S.sideMenuButton onClick={toggleTheme}>
          {isDarkTheme ? <LightbulbFill /> : <LightbulbOff />}
        </S.sideMenuButton>
      </S.wrapperButtons>

      <S.MenuWrapper $menuIsOpen={menuIsOpen}>
        <S.MenuItem>
          <Link onClick={toggleMenu} url="/">
            {t('menu.Home')}
          </Link>
        </S.MenuItem>

        {/*
        <S.MenuItem>
          <Link onClick={toggleMenu} url="/#about">
            {t('menu.Infos')}
          </Link>
        </S.MenuItem>
        <S.MenuItem>
          <Link onClick={toggleMenu} url="/#jobs">
            {t('menu.Jobs')}
          </Link>
        </S.MenuItem>
        */}
      </S.MenuWrapper>
    </S.Wrapper>
  )
}

export default Menu
