import Heading from '@/components/Heading'
import Image from '@/components/Image'
import Text from '@/components/Text'

import { Location } from '@styled-icons/evil/Location'
import { Briefcase } from '@styled-icons/ionicons-outline/Briefcase'
import { Stack } from '@styled-icons/bootstrap/Stack'

import * as S from './styles'

const Experiences = () => {
  return (
    <S.Wrapper>
      <S.WrapperItem>
        <S.WrapperItemTitle>
          <S.ImageWrapper>
            <Image
              src="/img/logos/logo-10.jpeg"
              alt="Logo"
              mode="borderRadius"
            />
          </S.ImageWrapper>

          <S.WrapperContentTitle>
            <Heading size="small" color="secondText">
              KeepCloud Adminstracao de Sistemas Ltda · Tempo integral
            </Heading>

            <Text color="thirdText">
              {`De jan de 2024 até mai de 2024 · 5 meses · Presencial`}
            </Text>

            <S.InfoRow>
              <Text icon={<Briefcase />} color="secondText">
                Desenvolvedor Fullstack
              </Text>
              <Text icon={<Location />} color="secondText">
                São Paulo, Brasil
              </Text>
            </S.InfoRow>
          </S.WrapperContentTitle>
        </S.WrapperItemTitle>

        <S.ContentWrapper>
          <Text color="secondText">
            Contratado como Pessoa Jurídica em modelo presencial na posição de
            Desenvolvedor Full Stack. Durante este período, fui responsável pelo
            desenvolvimento utilizando tecnologias como PHP, Laravel, Git,
            Docker, Redis, Bootstrap e MySQL. Além disso:
          </Text>

          <Text color="secondText">
            - Conquistei aprovação em teste prático para desenvolvedor full
            stack pleno.
            <br />- Facilitei reuniões diárias de Scrum com a equipe de
            desenvolvimento para alinhamento de projetos.
            <br />- Conduzi sessões mensais de Planning do Scrum para definir
            objetivos estratégicos.
            <br />- Contribuí significativamente para a integração com a API de
            serviços da plataforma e para a implementação de serviços
            diretamente nos servidores cloud.
            <br />- Desempenhei um papel crucial no desenvolvimento full stack
            da plataforma, integrando APIs de diversos servidores cloud.
            <br />
          </Text>

          <Text color="secondText">
            Durante este período, expandi minhas competências em Laravel e
            gestão de servidores cloud, enquanto entregava soluções robustas
            para integração de APIs e implementação de serviços cloud na
            plataforma.
          </Text>
        </S.ContentWrapper>

        <S.WrapperStacks>
          <S.InfoRow>
            <Text icon={<Stack />} color="secondText">
              {`Competências: JQuery · MariaDB · Docker · PHP · Laravel · MySQL · Redis · Debian · Git · Linux · Bash`}
            </Text>
          </S.InfoRow>
        </S.WrapperStacks>
      </S.WrapperItem>

      <S.WrapperItem>
        <S.WrapperItemTitle>
          <S.ImageWrapper>
            <Image
              src="/img/logos/logo-11.jpg"
              alt="Logo"
              mode="borderRadius"
            />
          </S.ImageWrapper>

          <S.WrapperContentTitle>
            <Heading size="small" color="secondText">
              AgroNegociar · Freelance
            </Heading>

            <Text color="thirdText">
              {`De dez de 2022 até set de 2023 · 10 meses · Remota`}
            </Text>

            <S.InfoRow>
              <Text icon={<Briefcase />} color="secondText">
                Desenvolvedor Fullstack
              </Text>
              <Text icon={<Location />} color="secondText">
                São Paulo, Brasil
              </Text>
            </S.InfoRow>
          </S.WrapperContentTitle>
        </S.WrapperItemTitle>

        <S.ContentWrapper>
          <Text color="secondText">
            Em dezembro de 2022, a CBC Agronegócios contratou meus serviços para
            um novo projeto. Fui responsável pelo desenvolvimento de um site
            institucional utilizando WordPress, em meio a uma reformulação de
            marca que incluiu a mudança de domínio. Durante este período:
          </Text>

          <Text color="secondText">
            - Realizei reuniões regulares com o cliente para alinhamento do
            projeto e requisitos.
            <br />
            - Utilize o Git para versionamento do projeto, garantindo controle
            de versão e colaboração eficiente.
            <br />
            - Desenvolvi tanto o frontend quanto o backend do site utilizando o
            CMS WordPress.
            <br />
            - Realizei o deploy do site no servidor, assegurando a
            disponibilidade e performance.
            <br />- Configurei o plugin de SEO e o certificado SSL, melhorando a
            visibilidade e segurança do site.
          </Text>

          <Text color="secondText">
            Além de expandir minhas habilidades como empreendedor e
            desenvolvedor full stack, neste projeto, também formei uma equipe de
            design e conduzi reuniões presenciais para garantir a alinhamento
            estratégico e operacional do projeto. Este projeto foi uma
            oportunidade de aprimorar minhas competências em JavaScript,
            WordPress, SASS, PHP, Bootstrap e Webpack, enquanto entregava
            soluções de alta qualidade em um ambiente de trabalho remoto
            colaborativo.
          </Text>
        </S.ContentWrapper>

        <S.WrapperStacks>
          <S.InfoRow>
            <Text icon={<Stack />} color="secondText">
              {`Competências: JavaScript · WordPress · SASS · PHP · Bootstrap · Webpack`}
            </Text>
          </S.InfoRow>
        </S.WrapperStacks>
      </S.WrapperItem>

      <S.WrapperItem>
        <S.WrapperItemTitle>
          <S.ImageWrapper>
            <Image
              src="/img/logos/logo-6.jpeg"
              alt="Logo"
              mode="borderRadius"
            />
          </S.ImageWrapper>

          <S.WrapperContentTitle>
            <Heading size="small" color="secondText">
              Zebra Deluxe Comunicação · Freelance
            </Heading>

            <Text color="thirdText">
              {`De jul de 2022 até dez de 2022 · 6 meses · Remota`}
            </Text>

            <S.InfoRow>
              <Text icon={<Briefcase />} color="secondText">
                Desenvolvedor Fullstack
              </Text>
              <Text icon={<Location />} color="secondText">
                São Paulo, Brasil
              </Text>
            </S.InfoRow>
          </S.WrapperContentTitle>
        </S.WrapperItemTitle>

        <S.ContentWrapper>
          <Text color="secondText">
            Em julho de 2022, fui contratado pela Agência Zebra Deluxe para um
            projeto de desenvolvimento de site institucional para um cliente.
            Utilizei WordPress para o desenvolvimento do backend e frontend,
            utilizando Webpack com JavaScript e Sass para o frontend. Durante
            este projeto, minhas responsabilidades incluíram:
          </Text>

          <Text color="secondText">
            - Condução de reuniões estratégicas com o cliente para alinhamento
            de projetos e requisitos.
            <br />- Utilização do Git para versionamento do projeto, garantindo
            rastreabilidade e colaboração eficaz.
            <br />- Implementação completa do frontend e backend do site
            utilizando WordPress, assegurando alta qualidade e desempenho.
            <br />- Realização do deploy do site utilizando cPanel, garantindo
            disponibilidade e escalabilidade.
            <br />- Configuração do plugin de SEO e implementação de certificado
            SSL para melhorar a visibilidade e segurança do site.
          </Text>

          <Text color="secondText">
            Este projeto me permitiu aprimorar minhas habilidades em
            desenvolvimento web e gestão de projetos em um ambiente colaborativo
            e dinâmico.
          </Text>
        </S.ContentWrapper>

        <S.WrapperStacks>
          <S.InfoRow>
            <Text icon={<Stack />} color="secondText">
              {`Competências: JavaScript · JQuery · WordPress · HTML5 · SASS · Docker`}
            </Text>
          </S.InfoRow>
        </S.WrapperStacks>
      </S.WrapperItem>

      <S.WrapperItem>
        <S.WrapperItemTitle>
          <S.ImageWrapper>
            <Image
              src="/img/logos/logo-13.jpg"
              alt="Logo"
              mode="borderRadius"
            />
          </S.ImageWrapper>

          <S.WrapperContentTitle>
            <Heading size="small" color="secondText">
              Layer Up · Freelance
            </Heading>

            <Text color="thirdText">
              {`mai de 2022 - jun de 2022 · 2 meses · Remota`}
            </Text>

            <S.InfoRow>
              <Text icon={<Briefcase />} color="secondText">
                Desenvolvedor Fullstack
              </Text>
              <Text icon={<Location />} color="secondText">
                São Paulo, Brasil
              </Text>
            </S.InfoRow>
          </S.WrapperContentTitle>
        </S.WrapperItemTitle>

        <S.ContentWrapper>
          <Text color="secondText">
            Em maio de 2022, participei como freelancer na Agência Layer Up,
            onde trabalhei diretamente no site da empresa e em um projeto para
            um cliente da agência. Durante este período, utilizei tecnologias
            como PHP, WordPress, SCSS, Webpack, jQuery e JavaScript. Minhas
            responsabilidades incluíram:
          </Text>

          <Text color="secondText">
            - Condução de reuniões frequentes com clientes para alinhamento de
            projetos e definição de requisitos.
            <br />
            - Utilização do Git para versionamento do código, assegurando
            rastreabilidade e colaboração eficaz.
            <br />
            - Integração ao Webpack e otimização de SEO para melhorar o
            desempenho e visibilidade do site.
            <br />
            - Reformulação do frontend visando melhorias no código e
            performance.
            <br />- Implementação de novas funcionalidades tanto no frontend
            quanto no backend.
          </Text>

          <Text color="secondText">
            Durante esse projeto, pude expandir minhas competências em
            JavaScript, jQuery, WordPress, Git, PHP, Figma, MySQL e Webpack,
            enquanto entregava soluções de alta qualidade em um ambiente remoto
            colaborativo.
          </Text>
        </S.ContentWrapper>

        <S.WrapperStacks>
          <S.InfoRow>
            <Text icon={<Stack />} color="secondText">
              {`Competências: JavaScript · JQuery · WordPress · Git · PHP · Figma · MySQL · Webpack`}
            </Text>
          </S.InfoRow>
        </S.WrapperStacks>
      </S.WrapperItem>

      <S.WrapperItem>
        <S.WrapperItemTitle>
          <S.ImageWrapper>
            <Image
              src="/img/logos/logo-9.jpeg"
              alt="Logo"
              mode="borderRadius"
            />
          </S.ImageWrapper>

          <S.WrapperContentTitle>
            <Heading size="small" color="secondText">
              QuikDev · Tempo integral
            </Heading>

            <Text color="thirdText">
              {`mar de 2022 - abr de 2022 · 2 meses · Remota`}
            </Text>

            <S.InfoRow>
              <Text icon={<Briefcase />} color="secondText">
                Desenvolvedor front-end
              </Text>
              <Text icon={<Location />} color="secondText">
                São Paulo, Brasil
              </Text>
            </S.InfoRow>
          </S.WrapperContentTitle>
        </S.WrapperItemTitle>

        <S.ContentWrapper>
          <Text color="secondText">
            Contratado como Pessoa Jurídica em modelo home office como
            Desenvolvedor Frontend na QuikDev, sediada em Campinas, São Paulo.
            Durante esse breve período, utilizei tecnologias avançadas como
            TypeScript, Next.js, React, TailwindCSS, Git e Docker.
          </Text>

          <Text color="secondText">
            - Aprovação em teste prático para desenvolvedor frontend pleno,
            validando minha proficiência técnica.
            <br />
            - Condução da Planning do Scrum para alinhamento estratégico com a
            equipe de desenvolvimento.
            <br />
            - Realização de Daily Scrum para garantir a sincronização eficaz dos
            projetos.
            <br />- Desenvolvimento de páginas utilizando React com o Next.js
            como framework frontend.
          </Text>

          <Text color="secondText">
            Essa experiência breve foi extremamente proveitosa, permitindo-me
            aprimorar minhas competências em Git, Next.js, TypeScript, Docker,
            Tailwind CSS e React, enquanto contribuía para os objetivos da
            QuikDev em um ambiente de trabalho remoto.
          </Text>
        </S.ContentWrapper>

        <S.WrapperStacks>
          <S.InfoRow>
            <Text icon={<Stack />} color="secondText">
              {`Competências: Git · Nextjs · TypeScript · Docker · Tailwind CSS · React.js`}
            </Text>
          </S.InfoRow>
        </S.WrapperStacks>
      </S.WrapperItem>

      <S.WrapperItem>
        <S.WrapperItemTitle>
          <S.ImageWrapper>
            <Image
              src="/img/logos/logo-8.jpeg"
              alt="Logo"
              mode="borderRadius"
            />
          </S.ImageWrapper>

          <S.WrapperContentTitle>
            <Heading size="small" color="secondText">
              Meeta Solutions · Terceirizado
            </Heading>

            <Text color="thirdText">
              {`De jan de 2022 até mar de 2022 · 3 meses · Híbrida`}
            </Text>

            <S.InfoRow>
              <Text icon={<Briefcase />} color="secondText">
                Desenvolvedor Fullstack
              </Text>
              <Text icon={<Location />} color="secondText">
                São Paulo, Brasil
              </Text>
            </S.InfoRow>
          </S.WrapperContentTitle>
        </S.WrapperItemTitle>

        <S.ContentWrapper>
          <Text color="secondText">
            Iniciei o ano de 2022 na Meeta Solutions, atuando como Pessoa
            Jurídica em um modelo híbrido como Desenvolvedor Full Stack. Fui
            alocado em um projeto da FIS Global na sede em Jundiaí, São Paulo.
            Durante este período de experiência, utilizei tecnologias como
            Windows, Docker, JQuery, Laravel, Blade Templates, CSS e Git.
          </Text>

          <Text color="secondText">
            - Aprovação em teste prático para desenvolvedor full stack pleno,
            validando minha competência técnica.
            <br />- Participação parcial no treinamento do RP por videochamada
            com o PM do projeto.
            <br />- Desenvolvimento de demandas específicas para sites e
            sistemas web.
            <br />- Registro detalhado de todas as tarefas no plataforma
            runrun.it.
          </Text>

          <Text color="secondText">
            Essa experiência breve na Meeta Solutions proporcionou
            significativos avanços em minha habilidade como desenvolvedor full
            stack, além de me permitir contribuir de maneira efetiva para o
            projeto da FIS Global. Aprendi a utilizar tecnologias como JQuery,
            PHP, Laravel, Microsoft SQL Server em um ambiente híbrido,
            reforçando minha expertise no desenvolvimento de soluções web
            robustas.
          </Text>
        </S.ContentWrapper>

        <S.WrapperStacks>
          <S.InfoRow>
            <Text icon={<Stack />} color="secondText">
              {`Competências: JQuery · PHP · Laravel · Docker · Microsoft SQL Server`}
            </Text>
          </S.InfoRow>
        </S.WrapperStacks>
      </S.WrapperItem>

      <S.WrapperItem>
        <S.WrapperItemTitle>
          <S.ImageWrapper>
            <Image
              src="/img/logos/logo-13.jpg"
              alt="Logo"
              mode="borderRadius"
            />
          </S.ImageWrapper>

          <S.WrapperContentTitle>
            <Heading size="small" color="secondText">
              Layer Up · Freelance
            </Heading>

            <Text color="thirdText">
              {`ago de 2021 - nov de 2021 · 4 meses · Remota`}
            </Text>

            <S.InfoRow>
              <Text icon={<Briefcase />} color="secondText">
                Desenvolvedor Fullstack
              </Text>
              <Text icon={<Location />} color="secondText">
                São Paulo, Brasil
              </Text>
            </S.InfoRow>
          </S.WrapperContentTitle>
        </S.WrapperItemTitle>

        <S.ContentWrapper>
          <Text color="secondText">
            Logo da empresa Layer Up Desenvolvedor full stackDesenvolvedor full
            stack Layer Up · FreelanceLayer Up · Freelance ago de 2021 - nov de
            2021 · 4 mesesDe ago de 2021 até nov de 2021 · 4 meses São Paulo,
            Brasil · RemotaSão Paulo, Brasil · Remota Em agosto de 2021, comecei
            a colaborar como freelancer para a Agência Layer Up, onde participei
            ativamente de dois projetos utilizando o CMS WordPress. Durante esse
            período:
          </Text>

          <Text color="secondText">
            - Conduzi reuniões frequentes com clientes para alinhamento de
            projetos e definição de requisitos.
            <br />- Utilizei Git para versionamento de código, garantindo
            controle de versão e colaboração eficiente.
            <br />- Desenvolvi completamente o frontend e backend de uma landing
            page e um blog.
            <br />- Realizei o deploy dos projetos utilizando cPanel,
            assegurando disponibilidade e performance.
          </Text>

          <Text color="secondText">
            Minhas contribuições nesses projetos me permitiram aprimorar minhas
            habilidades em JavaScript, jQuery, WordPress, Adobe XD, PHP, MySQL e
            Webpack, além de fortalecer minha capacidade de gerenciar projetos
            de forma eficaz em um ambiente remoto.
          </Text>
        </S.ContentWrapper>

        <S.WrapperStacks>
          <S.InfoRow>
            <Text icon={<Stack />} color="secondText">
              {`Competências: JavaScript · JQuery · WordPress · Adobe XD · PHP · MySQL · Webpack`}
            </Text>
          </S.InfoRow>
        </S.WrapperStacks>
      </S.WrapperItem>

      <S.WrapperItem>
        <S.WrapperItemTitle>
          <S.ImageWrapper>
            <Image
              src="/img/logos/logo-7.jpeg"
              alt="Logo"
              mode="borderRadius"
            />
          </S.ImageWrapper>

          <S.WrapperContentTitle>
            <Heading size="small" color="secondText">
              CTC · Tempo integral
            </Heading>

            <Text color="thirdText">
              {`mar de 2020 - dez de 2020 · 10 meses · Remota`}
            </Text>

            <S.InfoRow>
              <Text icon={<Briefcase />} color="secondText">
                Desenvolvedor Fullstack
              </Text>
              <Text icon={<Location />} color="secondText">
                São Paulo, Brasil
              </Text>
            </S.InfoRow>
          </S.WrapperContentTitle>
        </S.WrapperItemTitle>

        <S.ContentWrapper>
          <Text color="secondText">
            Em março de 2020, iniciei meu trabalho na Interaktiv como
            Desenvolvedor Full Stack. Em junho do mesmo ano, a Interaktiv foi
            adquirida pela multinacional brasileira CTC. Durante meu tempo na
            empresa, trabalhei com um conjunto diversificado de tecnologias,
            incluindo Linux, Docker, Git, CakePHP, Laravel, WordPress, Vue.js,
            React e JavaScript. Principais responsabilidades e realizações:
          </Text>

          <Text color="secondText">
            - Aprovado em teste prático para desenvolvedor full stack pleno.
            <br />- Conduzia Daily Scrum com o time de desenvolvimento para
            alinhamento diário de projetos.
            <br />- Organizava o Planning do Scrum mensalmente para
            sincronização estratégica do time.
            <br />- Gerenciava o atendimento de tickets criados pelos clientes.
            <br />- Registrava todas as horas dedicadas (em tickets ou demandas
            internas) na plataforma da Interaktiv.
            <br />- Contribuí ativamente para o desenvolvimento e manutenção de
            sites e sistemas web utilizando as tecnologias mencionadas.
          </Text>

          <Text color="secondText">
            Durante esse período, expandi significativamente meus conhecimentos
            em Linux, utilizando Docker de forma intensiva para facilitar a
            criação e o gerenciamento de ambientes de desenvolvimento. Iniciei
            também minha atuação com frameworks JavaScript como React.js e
            Vue.js, contribuindo para a implementação de soluções modernas e
            eficientes em nossos projetos.
          </Text>
        </S.ContentWrapper>

        <S.WrapperStacks>
          <S.InfoRow>
            <Text icon={<Stack />} color="secondText">
              {`Competências: JavaScript · WordPress · PHP · Laravel · Linux · React.js · Vue.js · Ubuntu · Zsh · Docker`}
            </Text>
          </S.InfoRow>
        </S.WrapperStacks>
      </S.WrapperItem>

      <S.WrapperItem>
        <S.WrapperItemTitle>
          <S.ImageWrapper>
            <Image
              src="/img/logos/logo-6.jpeg"
              alt="Logo"
              mode="borderRadius"
            />
          </S.ImageWrapper>

          <S.WrapperContentTitle>
            <Heading size="small" color="secondText">
              Zebra Deluxe Comunicação · Tempo integral
            </Heading>

            <Text color="thirdText">
              {`mar de 2019 - abr de 2020 · 1 ano 2 meses · Presencial`}
            </Text>

            <S.InfoRow>
              <Text icon={<Briefcase />} color="secondText">
                Desenvolvedor Fullstack
              </Text>
              <Text icon={<Location />} color="secondText">
                São Paulo, Brasil
              </Text>
            </S.InfoRow>
          </S.WrapperContentTitle>
        </S.WrapperItemTitle>

        <S.ContentWrapper>
          <Text color="secondText">
            Entre março de 2019 e abril de 2020, atuei como Desenvolvedor de
            Front-end na Zebra Deluxe Comunicação, São Paulo, Brasil. Durante
            este período, trabalhei com MySQL, JQuery, Laravel, SASS, WordPress
            e JavaScript.
          </Text>

          <Text color="secondText">
            - Fui aprovado em um teste pratico para desenvolvedor fullstack
            pleno.
            <br />- Realizava Daily Scrum com o time de desenvolvimento para
            alinhamento de projetos.
            <br />- Estimava o tempo de desenvolvimento dos projeto junto com o
            time de desenvolvimento.
            <br />- Atuei na contratação de novos desenvolvedores.
            <br />- Atuei como líder técnico do time de desenvolvimento
            frontend, auxiliando os desenvolvedores abaixo e destribuindo
            trabalhos.
            <br />- Atuei no desenvolvimento de sites e sistemas web, utilizando
            as tecnologias citadas acima.
            <br />- Atuei no desenvolvimento de landing pages e hotsites.
            <br />- Também realizava a manutenção de sites e sistemas já
            existentes.
            <br />- Realizava o desenvolvimento de peças de e-mail marketing.
          </Text>

          <Text color="secondText">
            Durante este período, além de expandir significativamente meus
            conhecimentos e habilidades em técnicas avançadas de desenvolvimento
            frontend e na aplicação de tecnologias como MySQL, Laravel e
            WordPress para criar soluções robustas e eficientes, tive a
            oportunidade de liderar o time de frontend, buscando e auxiliando em
            diversas atuações.
          </Text>
        </S.ContentWrapper>

        <S.WrapperStacks>
          <S.InfoRow>
            <Text icon={<Stack />} color="secondText">
              {`Competências: JavaScript · JQuery · WordPress · SASS · Laravel · MySQL`}
            </Text>
          </S.InfoRow>
        </S.WrapperStacks>
      </S.WrapperItem>

      <S.WrapperItem>
        <S.WrapperItemTitle>
          <S.ImageWrapper>
            <Image
              src="/img/logos/logo-5.jpeg"
              alt="Logo"
              mode="borderRadius"
            />
          </S.ImageWrapper>

          <S.WrapperContentTitle>
            <Heading size="small" color="secondText">
              Agência 3xceler Ltda · Tempo integral
            </Heading>

            <Text color="thirdText">
              {`fev de 2019 - mar de 2019 · 2 meses · Presencial`}
            </Text>

            <S.InfoRow>
              <Text icon={<Briefcase />} color="secondText">
                Desenvolvedor Fullstack
              </Text>
              <Text icon={<Location />} color="secondText">
                São Paulo, Brasil
              </Text>
            </S.InfoRow>
          </S.WrapperContentTitle>
        </S.WrapperItemTitle>

        <S.ContentWrapper>
          <Text color="secondText">
            No ano de 2019, voltei a morar em São Paulo, e atuei como
            Desenvolvedor Fullstack na Agência 3xceler, São Paulo, Brasil, onde
            trabalhei com MySQL, JQuery, Git, PHP, HTML5 e WordPress.
          </Text>

          <Text color="secondText">
            - Fui aprovado em um teste pratico para desenvolvedor fullstack php.
            <br />- Realizava reuniões com o time de desenvolvimento para
            alinhamento de projetos.
            <br />- Atuei no desenvolvimento fullstack de sites de dois sites
            completos utilizando o cms wordpress.
          </Text>
        </S.ContentWrapper>

        <S.WrapperStacks>
          <S.InfoRow>
            <Text icon={<Stack />} color="secondText">
              {`Competências: JQuery · WordPress · Git · HTML5 · PHP`}
            </Text>
          </S.InfoRow>
        </S.WrapperStacks>
      </S.WrapperItem>

      <S.WrapperItem>
        <S.WrapperItemTitle>
          <S.ImageWrapper>
            <Image
              src="/img/logos/logo-4.jpeg"
              alt="Logo"
              mode="borderRadius"
            />
          </S.ImageWrapper>

          <S.WrapperContentTitle>
            <Heading size="small" color="secondText">
              Shape Web Agência de Internet · Tempo integral
            </Heading>

            <Text color="thirdText">
              {`ago de 2018 - dez de 2018 · 5 meses · Presencial`}
            </Text>

            <S.InfoRow>
              <Text icon={<Briefcase />} color="secondText">
                Desenvolvedor Fullstack
              </Text>
              <Text icon={<Location />} color="secondText">
                Campo Grande, Mato Grosso do Sul, Brasil
              </Text>
            </S.InfoRow>
          </S.WrapperContentTitle>
        </S.WrapperItemTitle>

        <S.ContentWrapper>
          <Text color="secondText">
            Em setembro de 2018 e até dezembro de 2018, atuei como Desenvolvedor
            Fullstack na Agência Shape Web, Campo Grande, Mato Grosso do Sul,
            Brasil. Trabalhei com MySQL, JQuery, Javascript, Git, SASS, PHP e
            HTML5.
          </Text>

          <Text color="secondText">
            - Fui aprovado em um teste pratico para desenvolvedor fullstack php.
            <br />- Realizava reuniões com o time de desenvolvimento para
            alinhamento de projetos.
            <br />- Atuei no desenvolvimento fullstack de sites de dois sites
            completos utilizando o cms wordpress.
          </Text>
        </S.ContentWrapper>

        <S.WrapperStacks>
          <S.InfoRow>
            <Text icon={<Stack />} color="secondText">
              {`Competências: JavaScript · JQuery · HTML5 · PHP · MySQL`}
            </Text>
          </S.InfoRow>
        </S.WrapperStacks>
      </S.WrapperItem>

      <S.WrapperItem>
        <S.WrapperItemTitle>
          <S.ImageWrapper>
            <Image
              src="/img/logos/logo-3.jpeg"
              alt="Logo"
              mode="borderRadius"
            />
          </S.ImageWrapper>

          <S.WrapperContentTitle>
            <Heading size="small" color="secondText">
              123Carros · Tempo integral
            </Heading>

            <Text color="thirdText">
              {`fev de 2018 - jul de 2018 · 6 meses`}
            </Text>

            <S.InfoRow>
              <Text icon={<Briefcase />} color="secondText">
                Desenvolvedor de front-end
              </Text>
              <Text icon={<Location />} color="secondText">
                São Paulo, Brasil
              </Text>
            </S.InfoRow>
          </S.WrapperContentTitle>
        </S.WrapperItemTitle>

        <S.ContentWrapper>
          <Text color="secondText">
            De fevereiro de 2018 a outubro de 2018, fui Desenvolvedor de
            Front-end na 123Carros. Durante este período, era responsável pelo
            desenvolvimento frontend do Marketplace. trabalhei com tecnologias
            como jQuery, Git, Laravel, Wordpress, SASS e PHP.
          </Text>

          <Text color="secondText">
            - Realizava reuniões com o time de desenvolvimento para alinhamento
            do projetos.
            <br />- Atuei no desenvolvimento do frontend da plataforma.
            <br />- Atuei como líder técnico do time de desenvolvimento
            frontend, auxiliando os desenvolvedores abaixo e distribuindo
            trabalhos.
            <br />- Atuei no desenvolvimento do frontend da plataforma
            utilizando as tecnologias citadas acima.
            <br />- Atuei no desenvolvimento de um blog para a plataforma
            utilizando o WordPress.
          </Text>
        </S.ContentWrapper>

        <S.WrapperStacks>
          <S.InfoRow>
            <Text icon={<Stack />} color="secondText">
              {`Competências: JQuery · WordPress · SASS · Git · Laravel`}
            </Text>
          </S.InfoRow>
        </S.WrapperStacks>
      </S.WrapperItem>

      <S.WrapperItem>
        <S.WrapperItemTitle>
          <S.ImageWrapper>
            <Image
              src="/img/logos/logo-12.jpg"
              alt="Logo"
              mode="borderRadius"
            />
          </S.ImageWrapper>

          <S.WrapperContentTitle>
            <Heading size="small" color="secondText">
              Agencia WebSide · Freelance
            </Heading>

            <Text color="thirdText">
              {`out de 2017 - fev de 2018 · 5 meses · Remota`}
            </Text>

            <S.InfoRow>
              <Text icon={<Briefcase />} color="secondText">
                Desenvolvedor Fullstack
              </Text>
              <Text icon={<Location />} color="secondText">
                São Paulo, Brasil
              </Text>
            </S.InfoRow>
          </S.WrapperContentTitle>
        </S.WrapperItemTitle>

        <S.ContentWrapper>
          <Text color="secondText">
            No final de 2017 passei a trabalhar home office como freelancer,
            onde atuei como Desenvolvedor Frontend em parceria com na Agencia
            WebSide. Durante este período, realizei diversos projetos para a
            agencia, onde era responsavel pelo desenvolvimento frontend dos
            projetos.
          </Text>

          <Text color="secondText">
            - Realizava reuniões com o time de desenvolvimento para alinhamento
            de projetos.
            <br />- Atuei no desenvolvimento do frontend de sites e landing
            pages, utilizando as tecnologias citadas acima.
            <br />- Atuei no desenvolvimento de peças de e-mail marketing.
          </Text>
        </S.ContentWrapper>

        <S.WrapperStacks>
          <S.InfoRow>
            <Text icon={<Stack />} color="secondText">
              {`Competências: JQuery · Git · HTML5 · PHP · CSS · Bootstrap`}
            </Text>
          </S.InfoRow>
        </S.WrapperStacks>
      </S.WrapperItem>

      <S.WrapperItem>
        <S.WrapperItemTitle>
          <S.ImageWrapper>
            <Image
              src="/img/logos/logo-2.jpeg"
              alt="Logo"
              mode="borderRadius"
            />
          </S.ImageWrapper>

          <S.WrapperContentTitle>
            <Heading size="small" color="secondText">
              Capital Mídia · Tempo integral
            </Heading>

            <Text color="thirdText">
              {`fev de 2016 - out de 2017 · 1 ano 9 meses · Presencial`}
            </Text>

            <S.InfoRow>
              <Text icon={<Briefcase />} color="secondText">
                Programador pleno
              </Text>
              <Text icon={<Location />} color="secondText">
                São Paulo, Brasil
              </Text>
            </S.InfoRow>
          </S.WrapperContentTitle>
        </S.WrapperItemTitle>

        <S.ContentWrapper>
          <Text color="secondText">
            Entre fevereiro de 2016 ja havia me formado como Tecnólogo em
            Sistemas para Internet e atuei na Capital Mídia em São Paulo,
            Brasil. No cargo de Programador, após o período de experiencia, fui
            efetivado e depois de um ano fui promovido a Programador Pleno.
            Durante este período, trabalhei com tecnologias como JQuery, Git,
            PHP, HTML5, WordPress, CSS e JavaScript.
          </Text>

          <Text color="secondText">
            - Realizava reuniões com o time de criação para alinhamento de
            projetos.
            <br />- Estimava o tempo de desenvolvimento dos projeto junto com o
            time de criação.
            <br />- Realizava reuniões com o time de desenvolvimento externo
            para entrega de projetos.
            <br />- Atuei na contratação de novos desenvolvedores.
            <br />- Atuei como líder técnico do time de desenvolvimento,
            auxiliando os desenvolvedores abaixo e distribuindo trabalhos para
            desenvolvedores externos.
            <br />- Atuei no desenvolvimento de sites e sistemas web, utilizando
            as tecnologias citadas acima.
            <br />- Atuei no desenvolvimento de sistemas, landing-pages e
            hotsites.
            <br />- Também realizava a manutenção de sites e sistemas já
            existentes.
            <br />- Realizava o desenvolvimento de peças de e-mail marketing.
          </Text>
        </S.ContentWrapper>

        <S.WrapperStacks>
          <S.InfoRow>
            <Text icon={<Stack />} color="secondText">
              {`Competências: JavaScript · JQuery · WordPress · PHP · CSS · API REST · MySQL · Bootstrap`}
            </Text>
          </S.InfoRow>
        </S.WrapperStacks>
      </S.WrapperItem>

      <S.WrapperItem>
        <S.WrapperItemTitle>
          <S.ImageWrapper>
            <Image
              src="/img/logos/logo-1.jpeg"
              alt="Logo"
              mode="borderRadius"
            />
          </S.ImageWrapper>

          <S.WrapperContentTitle>
            <Heading size="small" color="secondText">
              VAD - Estúdio Multimídia · Estágio
            </Heading>

            <Text color="thirdText">
              {`fev de 2016 - out de 2017 · 1 ano 9 meses · Presencial`}
            </Text>

            <S.InfoRow>
              <Text icon={<Briefcase />} color="secondText">
                Programador júnior
              </Text>
              <Text icon={<Location />} color="secondText">
                São Paulo, Brasil
              </Text>
            </S.InfoRow>
          </S.WrapperContentTitle>
        </S.WrapperItemTitle>

        <S.ContentWrapper>
          <Text color="secondText">
            No ano de 2013, iniciei minha carreira como estagiário / programador
            júnior na VAD - Estúdio Multimídia em São Paulo, Brasil. Neste
            papel, trabalhei com tecnologias como: JQuery, HTML, CSS e
            JavaScript.
          </Text>

          <Text color="secondText">
            - Atuei no desenvolvimento de sites e sistemas web, utilizando as
            tecnologias citadas acima.
            <br />- Também realizava a manutenção de sites e sistemas já
            existentes.
            <br />- Realizava o desenvolvimento de peças de e-mail marketing.
            <br />- Realiza disparos de e-mail marketing utilizando a ferramenta
            PhpMailer.
          </Text>
        </S.ContentWrapper>

        <S.WrapperStacks>
          <S.InfoRow>
            <Text icon={<Stack />} color="secondText">
              {`Competências: JavaScript · JQuery · HTML · PhpMyAdmin · HTML5 · PHP · CSS · MySQL · Bootstrap`}
            </Text>
          </S.InfoRow>
        </S.WrapperStacks>
      </S.WrapperItem>
    </S.Wrapper>
  )
}

export default Experiences
