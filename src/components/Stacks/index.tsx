import Button from '@/components/Button'
import Heading from '@/components/Heading'
import Hr from '@/components/Hr'

import { Html5 } from '@styled-icons/boxicons-logos/Html5'
import { Css3 } from '@styled-icons/boxicons-logos/Css3'
import { Bootstrap } from '@styled-icons/boxicons-logos/Bootstrap'
import { Sass } from '@styled-icons/boxicons-logos/Sass'
import { Styledcomponents } from '@styled-icons/simple-icons/Styledcomponents'
import { Jquery } from '@styled-icons/boxicons-logos/Jquery'
import { Webpack } from '@styled-icons/simple-icons/Webpack'
import { Javascript } from '@styled-icons/fluentui-system-filled/Javascript'
import { Typescript } from '@styled-icons/simple-icons/Typescript'
import { ReactLogo } from '@styled-icons/boxicons-logos/ReactLogo'
import { LogoVercel } from '@styled-icons/ionicons-solid/LogoVercel'
import { Mysql } from '@styled-icons/simple-icons/Mysql'
import { Microsoftsqlserver } from '@styled-icons/simple-icons/Microsoftsqlserver'
import { Php } from '@styled-icons/simple-icons/Php'
import { Wordpress } from '@styled-icons/fa-brands/Wordpress'
import { Laravel } from '@styled-icons/fa-brands/Laravel'
import { Linux } from '@styled-icons/fa-brands/Linux'
import { Git } from '@styled-icons/boxicons-logos/Git'
import { Docker } from '@styled-icons/boxicons-logos/Docker'
import { Windows } from '@styled-icons/boxicons-logos/Windows'
import { Graphql } from '@styled-icons/simple-icons/Graphql'

import * as S from './styles'

const Stacks = () => (
  <S.Wrapper>
    <Heading color="secondText" size="medium">
      Stacks
    </Heading>

    <S.ButtonsWrapper>
      <Button icon={<Html5 />}>HTML5</Button>
      <Button icon={<Css3 />}>CSS</Button>
      <Button icon={<Bootstrap />}>BOOTSTRAP</Button>
      <Button icon={<Sass />}>SASS</Button>
      <Button icon={<Styledcomponents />}>STYLED COMPONENTS</Button>
      <Button icon={<Jquery />}>jQuery</Button>
      <Button icon={<Webpack />}>Webpack</Button>
      <Button icon={<Javascript />}>JavaScript</Button>
      <Button icon={<Typescript />}>TypeScript</Button>
      <Button icon={<ReactLogo />}>React.js</Button>
      <Button icon={<ReactLogo />}>React native</Button>
      <Button icon={<ReactLogo />}>Expo</Button>
      <Button icon={<LogoVercel />}>Next.js</Button>
      <Button icon={<Graphql />}>Graphql</Button>
      <Button icon={<Mysql />}>MySQL</Button>
      <Button icon={<Microsoftsqlserver />}>SqlServer</Button>
      <Button icon={<Php />}>PHP</Button>
      <Button icon={<Wordpress />}>WordPress</Button>
      <Button icon={<Laravel />}>Laravel</Button>
      <Button icon={<Linux />}>Linux</Button>
      <Button icon={<Git />}>Git</Button>
      <Button icon={<Docker />}>Docker</Button>
      <Button icon={<Windows />}>WSL2</Button>
    </S.ButtonsWrapper>

    <Hr />
  </S.Wrapper>
)

export default Stacks
