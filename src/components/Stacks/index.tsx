import Button from 'components/Button'
import Heading from 'components/Heading'
import Hr from 'components/Hr'

import { Container } from 'components/Container'
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

import * as S from './styles'

const Stacks = () => (
  <Container>
    <S.Wrapper>
      <Heading color="gray" size="small">
        Stacks
      </Heading>

      <S.ButtonsWrapper>
        <Button target="_blank" icon={<Html5 />}>
          HTML5
        </Button>
        <Button target="_blank" icon={<Css3 />}>
          CSS
        </Button>
        <Button target="_blank" icon={<Bootstrap />}>
          BOOTSTRAP
        </Button>
        <Button target="_blank" icon={<Sass />}>
          SASS
        </Button>
        <Button target="_blank" icon={<Styledcomponents />}>
          STYLED COMPONENTS
        </Button>
        <Button target="_blank" icon={<Jquery />}>
          JQuery
        </Button>
        <Button target="_blank" icon={<Webpack />}>
          Webpack
        </Button>
        <Button target="_blank" icon={<Javascript />}>
          JavaScript
        </Button>
        <Button target="_blank" icon={<Typescript />}>
          TypeScript
        </Button>
        <Button target="_blank" icon={<ReactLogo />}>
          React.js
        </Button>
        <Button target="_blank" icon={<LogoVercel />}>
          Next.js
        </Button>
        <Button target="_blank" icon={<Mysql />}>
          MySQL
        </Button>
        <Button target="_blank" icon={<Microsoftsqlserver />}>
          SqlServer
        </Button>
        <Button target="_blank" icon={<Php />}>
          PHP
        </Button>
        <Button target="_blank" icon={<Wordpress />}>
          WordPress
        </Button>
        <Button target="_blank" icon={<Laravel />}>
          Laravel
        </Button>
        <Button target="_blank" icon={<Linux />}>
          Linux
        </Button>
        <Button target="_blank" icon={<Git />}>
          Git
        </Button>
        <Button target="_blank" icon={<Docker />}>
          Docker
        </Button>
        <Button target="_blank" icon={<Windows />}>
          WSL2
        </Button>
      </S.ButtonsWrapper>

      <Hr />
    </S.Wrapper>
  </Container>
)

export default Stacks
