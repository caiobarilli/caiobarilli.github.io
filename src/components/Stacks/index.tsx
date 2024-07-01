import Button from '@/components/Button'
import Hr from '@/components/Hr'

import { Php } from '@styled-icons/simple-icons/Php'
import { Wordpress } from '@styled-icons/fa-brands/Wordpress'
import { Laravel } from '@styled-icons/fa-brands/Laravel'
import { Nodejs } from '@styled-icons/boxicons-logos/Nodejs'
import { Nestjs } from '@styled-icons/simple-icons/Nestjs'

import { Typescript } from '@styled-icons/simple-icons/Typescript'
import { ReactLogo } from '@styled-icons/boxicons-logos/ReactLogo'
import { LogoVercel } from '@styled-icons/ionicons-solid/'
import { Angular } from '@styled-icons/boxicons-logos/Angular'
import { TailwindCss } from '@styled-icons/boxicons-logos/TailwindCss'
import { Styledcomponents } from '@styled-icons/simple-icons/Styledcomponents'

import { Git } from '@styled-icons/boxicons-logos/Git'
import { Docker } from '@styled-icons/fa-brands/Docker'
import { Debian } from '@styled-icons/simple-icons/Debian'
import { Ubuntu } from '@styled-icons/fa-brands/Ubuntu'
import { Postgresql } from '@styled-icons/simple-icons/Postgresql'
import { Mysql } from '@styled-icons/simple-icons/Mysql'
import { Mongodb } from '@styled-icons/simple-icons/Mongodb'
import { Firebase } from '@styled-icons/simple-icons/Firebase'
import { Aws } from '@styled-icons/boxicons-logos/Aws'
import { Digitalocean } from '@styled-icons/boxicons-logos/Digitalocean'
import { Cloudflare } from '@styled-icons/fa-brands/Cloudflare'

import * as S from './styles'
import Heading from '../Heading'

const Stacks = () => (
  <S.Wrapper>
    <Heading color="secondText">Principais Competências:</Heading>

    <S.ButtonsWrapper>
      <Button icon={<Php />}>PHP</Button>
      <Button icon={<Wordpress />}>WordPress</Button>
      <Button icon={<Laravel />}>Laravel</Button>
      <Button icon={<Nodejs />}>Node.js</Button>
      <Button icon={<LogoVercel />}>Next.js</Button>
      <Button icon={<Nestjs />}>Nest.js</Button>
      <Button icon={<Git />}>Git</Button>
      <Button icon={<Typescript />}>TypeScript</Button>
      <Button icon={<Angular />}>Angular</Button>
      <Button icon={<ReactLogo />}>React.js</Button>
      <Button icon={<ReactLogo />}>React native</Button>
      <Button icon={<ReactLogo />}>Expo</Button>
      <Button icon={<Styledcomponents />}>Styled-components</Button>
      <Button icon={<TailwindCss />}>TailwindCss</Button>
      <Button icon={<Postgresql />}>PostgreSQL</Button>
      <Button icon={<Mysql />}>MySQL</Button>
      <Button icon={<Mongodb />}>MongoDB</Button>
      <Button icon={<Firebase />}>Firebase</Button>

      <Button icon={<Docker />}>Docker</Button>
      <Button icon={<Debian />}>Debian</Button>
      <Button icon={<Ubuntu />}>Ubuntu</Button>

      <Button icon={<Aws />}>AWS</Button>
      <Button icon={<Digitalocean />}>DigitalOcean</Button>
      <Button icon={<Cloudflare />}>Cloudflare</Button>
    </S.ButtonsWrapper>

    <Hr />
  </S.Wrapper>
)

export default Stacks
