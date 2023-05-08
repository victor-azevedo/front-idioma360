import { Box } from "@mui/material";
import Head from "next/head";

import ContainerEaseIn from "@/src/components/ContainerEaseIn";
import DetailsCard from "@/src/components/base/DetailsCard";

const Page = () => {
  const about = `Um desenvolvedor web de sucesso é alguém que tem as habilidades e o conhecimento técnico necessários para criar sites e aplicações web que sejam eficientes, seguros, escaláveis e fáceis de usar. Além disso, um desenvolvedor web de sucesso deve ter habilidades interpessoais e de gerenciamento de projetos para trabalhar bem em equipe e gerenciar projetos de desenvolvimento de software com sucesso.\n
  Algumas das habilidades e características que um desenvolvedor web de sucesso deve ter incluem:\n
  Forte conhecimento de linguagens de programação web, como HTML, CSS, JavaScript e outras.\n
  Experiência com frameworks web populares, como Angular, React, Vue.js, Ruby on Rails, Django, entre outros.\n
  Conhecimento em banco de dados e linguagens SQL.\n
  Conhecimento de ferramentas e práticas de desenvolvimento ágil, como Scrum, Kanban, entre outros.\n
  Boa comunicação e habilidades de gerenciamento de projetos para trabalhar bem em equipe e liderar projetos de desenvolvimento de software.\n
  Habilidade para resolver problemas e trabalhar em equipe para identificar e corrigir bugs e problemas de desempenho.\n
  Excelentes habilidades de resolução de problemas para identificar e corrigir problemas de segurança e desempenho em sites e aplicações web.\n
  Um desenvolvedor web de sucesso também deve estar atualizado com as novas tecnologias e tendências do mercado, dedicar-se à aprendizagem constante e estar aberto a feedbacks construtivos e críticas para melhorar suas habilidades e o trabalho entregue.`;

  const education = [
    {
      course: "Física",
      school: "UECE",
      startYear: "2007",
      endYear: "2008",
    },
    {
      course: "Eng Mecatrônica",
      school: "IFCE",
      startYear: "2007",
      endYear: "2012",
    },
  ];
  const expertise = ["Inglês", "Português"];
  return (
    <>
      <Head>
        <title>Teste Componentes</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <ContainerEaseIn>
          <DetailsCard
            title="Jose Victor"
            subtitle="Desenvolvedor Web"
            avatar="http://github.com/victor-azevedo.png"
            email="victorazeve@gmail.com"
            location="Manaíra"
            phone="85 99749-2998"
            about={about}
            education={education}
            expertise={expertise}
          />
        </ContainerEaseIn>
      </Box>
    </>
  );
};

export default Page;
