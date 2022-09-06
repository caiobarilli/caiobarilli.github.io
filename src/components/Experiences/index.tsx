import Heading from 'components/Heading'
import Image from 'components/Image'
import Text from 'components/Text'

import { Container } from 'components/Container'

import { Location } from '@styled-icons/evil/Location'
import { Briefcase } from '@styled-icons/ionicons-outline/Briefcase'
import { Stack } from '@styled-icons/bootstrap/Stack'

import * as S from './styles'

const Experiences = () => (
  <Container>
    <S.Wrapper>
      <Heading color="gray" size="small">
        Experiências
      </Heading>
    </S.Wrapper>

    <br />

    <S.Wrapper>
      <S.ImageWrapper>
        <Image
          src="https://media-exp1.licdn.com/dms/image/C4D0BAQFkO_efxNC1kw/company-logo_100_100/0/1630503793852?e=1670457600&v=beta&t=iCvo3CZMkFUbBmRyzStB4lTCpB5l4MaG84AxLPBHy5U"
          mode="borderRadius"
        />
      </S.ImageWrapper>
      <S.ContentWrapper>
        <>
          <Heading size="small">QuikDev</Heading>
          <Text color="lightGray">
            mar de 2019 - abr de 2020 · 1 ano 2 meses
          </Text>
        </>

        <S.InfoRow>
          <Text icon={<Briefcase />} color="gray">
            Desenvolvedor de frontend
          </Text>

          <Text icon={<Stack />} color="gray">
            React.js · WSL2 · Docker · TypeScript · Next.js · Git
          </Text>
        </S.InfoRow>

        <S.InfoRow>
          <Text icon={<Location />} color="gray">
            Home Office
          </Text>
        </S.InfoRow>
      </S.ContentWrapper>
    </S.Wrapper>

    <br />

    <S.Wrapper>
      <S.ImageWrapper>
        <Image
          src="https://media-exp1.licdn.com/dms/image/C4D0BAQGR38OSzI0hcg/company-logo_100_100/0/1567435276405?e=1670457600&v=beta&t=cy3MULtTU56KfzN3A0iQKWjn9fW-Rj-V3yYihdocAB8"
          mode="borderRadius"
        />
      </S.ImageWrapper>
      <S.ContentWrapper>
        <>
          <Heading size="small">Meeta Solutions</Heading>
          <Text color="lightGray">fev de 2022 - mar de 2022 · 2 meses</Text>
        </>

        <S.InfoRow>
          <Text icon={<Briefcase />} color="gray">
            Desenvolvedor de Fullstack
          </Text>

          <Text icon={<Stack />} color="gray">
            WSL2 · Docker · JQuery · Laravel · Git
          </Text>
        </S.InfoRow>

        <S.InfoRow>
          <Text icon={<Location />} color="gray">
            Home Office / São Paulo - Brasil
          </Text>
        </S.InfoRow>
      </S.ContentWrapper>
    </S.Wrapper>

    <br />

    <S.Wrapper>
      <S.ImageWrapper>
        <Image
          src="https://media-exp1.licdn.com/dms/image/C4D0BAQF_tdTVtgLBfQ/company-logo_100_100/0/1658239435332?e=1670457600&v=beta&t=7dabOuMt9sk6SjFdOpjzpa260B0yDPqGCnI-HUGHVk0"
          mode="borderRadius"
        />
      </S.ImageWrapper>
      <S.ContentWrapper>
        <>
          <Heading size="small">CTC</Heading>
          <Text color="lightGray">mar de 2020 - dez de 2020 · 10 mesess</Text>
        </>

        <S.InfoRow>
          <Text icon={<Briefcase />} color="gray">
            Desenvolvedor Fullstack
          </Text>

          <Text icon={<Stack />} color="gray">
            Docker · CakePHP · Linux · Git · Laravel · Vue.js · WordPress ·
            JavaScript
          </Text>
        </S.InfoRow>

        <S.InfoRow>
          <Text icon={<Location />} color="gray">
            Home Office
          </Text>
        </S.InfoRow>
      </S.ContentWrapper>
    </S.Wrapper>

    <br />

    <S.Wrapper>
      <S.ImageWrapper>
        <Image
          src="https://media-exp1.licdn.com/dms/image/C560BAQH_4LsqtE-nHQ/company-logo_100_100/0/1558361792097?e=1670457600&v=beta&t=VBV6MVgWeFD2yKwH00LUs79-5lnQ_HA6N1cEWD1der4"
          mode="borderRadius"
        />
      </S.ImageWrapper>
      <S.ContentWrapper>
        <>
          <Heading size="small">Zebra Deluxe Comunicação</Heading>
          <Text color="lightGray">
            mar de 2019 - abr de 2020 · 1 ano 2 meses
          </Text>
        </>

        <S.InfoRow>
          <Text icon={<Briefcase />} color="gray">
            Desenvolvedor de front-end
          </Text>

          <Text icon={<Stack />} color="gray">
            MySQL · JQuery · Laravel · SASS · WordPress · JavaScript
          </Text>
        </S.InfoRow>

        <S.InfoRow>
          <Text icon={<Location />} color="gray">
            São Paulo, Brasil
          </Text>
        </S.InfoRow>
      </S.ContentWrapper>
    </S.Wrapper>

    <br />

    <S.Wrapper>
      <S.ImageWrapper>
        <Image
          src="https://media-exp1.licdn.com/dms/image/C4D0BAQHpOtOl9coViw/company-logo_100_100/0/1519922008630?e=1670457600&v=beta&t=QqvJrzjlxAMmrMcACALDLe_xu4_4RSP-DjKhhCR3tOE"
          mode="borderRadius"
        />
      </S.ImageWrapper>
      <S.ContentWrapper>
        <>
          <Heading size="small">Agência 3xceler Ltda - Me</Heading>
          <Text color="lightGray">fev de 2019 - mar de 2019 · 2 meses</Text>
        </>

        <S.InfoRow>
          <Text icon={<Location />} color="gray">
            São Paulo, Brasil
          </Text>

          <Text icon={<Stack />} color="gray">
            Stylus · MySQL · JQuery · Git · PHP · HTML5 · WordPress
          </Text>
        </S.InfoRow>

        <S.InfoRow>
          <Text icon={<Briefcase />} color="gray">
            Desenvolvedor Fullstack
          </Text>
        </S.InfoRow>
      </S.ContentWrapper>
    </S.Wrapper>

    <br />

    <S.Wrapper>
      <S.ImageWrapper>
        <Image
          src=" https://media-exp1.licdn.com/dms/image/C4E0BAQF2AbaLxLLIwg/company-logo_100_100/0/1567628016839?e=1670457600&v=beta&t=BSJ1E04HaaOoMjDE29Grskei3eS4yhyDBlOQ4ginD1E"
          mode="borderRadius"
        />
      </S.ImageWrapper>
      <S.ContentWrapper>
        <>
          <Heading size="small">Shape Web Agência de Internet</Heading>
          <Text color="lightGray">set de 2018 - dez de 2018 · 4 meses</Text>
        </>

        <S.InfoRow>
          <Text icon={<Briefcase />} color="gray">
            Desenvolvedor Fullstack
          </Text>

          <Text icon={<Stack />} color="gray">
            MySQL · JQuery · Git · SASS · PHP · HTML5
          </Text>
        </S.InfoRow>

        <S.InfoRow>
          <Text icon={<Location />} color="gray">
            Campo Grande, Mato Grosso do Sul, Brasil
          </Text>
        </S.InfoRow>
      </S.ContentWrapper>
    </S.Wrapper>

    <br />

    <S.Wrapper>
      <S.ImageWrapper>
        <Image
          src="https://media-exp1.licdn.com/dms/image/C4E0BAQG8PK_3FdAUgQ/company-logo_100_100/0/1524155901135?e=1670457600&v=beta&t=EM1ImOrp5aOCPAnBOsrp83HrATzmyrvXA1o80AnwNO4"
          mode="borderRadius"
        />
      </S.ImageWrapper>
      <S.ContentWrapper>
        <>
          <Heading size="small">123Carros</Heading>
          <Text color="lightGray">fev de 2018 - out de 2018 · 9 meses</Text>
        </>

        <S.InfoRow>
          <Text icon={<Briefcase />} color="gray">
            Desenvolvedor de front-end
          </Text>

          <Text icon={<Stack />} color="gray">
            JQuery · Git · Laravel · SASS · PHP
          </Text>
        </S.InfoRow>

        <S.InfoRow>
          <Text icon={<Location />} color="gray">
            São Paulo, Brasil
          </Text>
        </S.InfoRow>
      </S.ContentWrapper>
    </S.Wrapper>

    <br />

    <S.Wrapper>
      <S.ImageWrapper>
        <Image
          src="https://media-exp1.licdn.com/dms/image/C4D0BAQHrsZ5AacGA7w/company-logo_100_100/0/1519911612259?e=1670457600&v=beta&t=m26xzWfz3yfbXdd7tj4QNisfcGP27Ph_tuU3Afsz--c"
          mode="borderRadius"
        />
      </S.ImageWrapper>
      <S.ContentWrapper>
        <>
          <Heading size="small">Capital Mídia </Heading>
          <Text color="lightGray">
            fev de 2016 - out de 2017 · 1 ano 9 meses
          </Text>
        </>

        <S.InfoRow>
          <Text icon={<Briefcase />} color="gray">
            Programador web
          </Text>

          <Text icon={<Stack />} color="gray">
            JQuery · Git · PHP · HTML5 · WordPress · CSS · JavaScript
          </Text>
        </S.InfoRow>

        <S.InfoRow>
          <Text icon={<Location />} color="gray">
            São Paulo, Brasil
          </Text>
        </S.InfoRow>
      </S.ContentWrapper>
    </S.Wrapper>

    <br />

    <S.Wrapper>
      <S.ImageWrapper>
        <Image
          src="https://media-exp1.licdn.com/dms/image/C560BAQHPOYtCY3tYMg/company-logo_100_100/0/1519886912915?e=1670457600&v=beta&t=fb3MpqnX9paaxTpiPkmYfxHw1IvedW4cWOg1--1oc9k"
          mode="borderRadius"
        />
      </S.ImageWrapper>
      <S.ContentWrapper>
        <>
          <Heading size="small">VAD - Estúdio Multimídia</Heading>
          <Text color="lightGray">jul de 2012 - dez de 2012 · 6 meses</Text>
        </>

        <S.InfoRow>
          <Text icon={<Briefcase />} color="gray">
            Webmaster
          </Text>

          <Text icon={<Stack />} color="gray">
            JQuery · HTML · CSS · JavaScript
          </Text>
        </S.InfoRow>

        <S.InfoRow>
          <Text icon={<Location />} color="gray">
            São Paulo, Brasil
          </Text>
        </S.InfoRow>
      </S.ContentWrapper>
    </S.Wrapper>
  </Container>
)

export default Experiences
