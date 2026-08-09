export type Lang = 'pt' | 'en'

export type Localized = Record<Lang, string>

export const profile = {
  name: 'Pedro Gentil Roodes Rodrigues',
  shortName: 'Pedro Gentil',
  github: 'gentilpedro',
  githubUrl: 'https://github.com/gentilpedro',
  linkedinUrl: 'https://linkedin.com/in/pedro-gentil',
  email: 'pedro.desev@outlook.com',
  altEmail: 'pedro.desenv@gmail.com',
  phone: '+55 53 99125-2555',
  phoneHref: '+5553991252555',
  whatsapp: 'https://wa.me/5553991252555',
  avatar: 'https://avatars.githubusercontent.com/u/114460216?v=4',
  cv: 'pedro-gentil-cv.pdf',
  location: { pt: 'Pelotas, RS — Brasil', en: 'Pelotas, RS — Brazil' } as Localized,
  role: {
    pt: 'Desenvolvedor Full Stack .NET',
    en: 'Full Stack .NET Developer',
  } as Localized,
  company: 'Josapar',
  availability: {
    pt: 'Aberto a novas oportunidades',
    en: 'Open to new opportunities',
  } as Localized,
}

export const hero = {
  tagline: {
    pt: 'Construo sistemas corporativos que <em>milhares de pessoas</em> usam todo dia.',
    en: 'I build enterprise systems that <em>thousands of people</em> rely on every day.',
  } as Localized,
  intro: {
    pt: 'Full Stack focado em .NET e C#, com atuação de ponta a ponta: da modelagem de dados e APIs RESTful até deploy, observabilidade e automação de infraestrutura.',
    en: 'Full Stack developer focused on .NET and C#, working end to end: from data modeling and RESTful APIs to deployment, observability and infrastructure automation.',
  } as Localized,
}

/** Números verificáveis do currículo — usados na faixa de destaque do Hero. */
export const stats: { value: string; label: Localized }[] = [
  {
    value: '200+',
    label: { pt: 'Projetos desenvolvidos e mantidos', en: 'Projects built and maintained' },
  },
  {
    value: '2.000+',
    label: { pt: 'Usuários diários dos sistemas', en: 'Daily users of the systems' },
  },
  {
    value: 'R$ 50k',
    label: { pt: 'Economia diária gerada à empresa', en: 'Daily cost savings delivered' },
  },
  {
    value: '3+',
    label: { pt: 'Anos de experiência profissional', en: 'Years of professional experience' },
  },
]

export const about: Localized[] = [
  {
    pt: 'Sou Desenvolvedor Full Stack em formação em Análise e Desenvolvimento de Sistemas, com experiência sólida em <strong>ASP.NET Core (MVC e Razor Pages)</strong>, .NET Framework e <strong>Java 7 a 17</strong>. No back-end atuo principalmente com C# e .NET, sempre com foco em desempenho, escalabilidade e boas práticas de arquitetura.',
    en: 'I am a Full Stack developer pursuing a degree in Systems Analysis and Development, with solid experience in <strong>ASP.NET Core (MVC and Razor Pages)</strong>, .NET Framework and <strong>Java 7 to 17</strong>. On the back end I work mainly with C# and .NET, always focused on performance, scalability and sound architecture.',
  },
  {
    pt: 'Desenvolvo, mantenho e integro <strong>APIs RESTful</strong> aplicando princípios <strong>SOLID</strong> e <strong>DDD</strong>. Tenho vivência em aplicações web, desktop, mobile e serviços corporativos, além de integrações entre sistemas em ambientes de grande porte.',
    en: 'I develop, maintain and integrate <strong>RESTful APIs</strong> applying <strong>SOLID</strong> and <strong>DDD</strong> principles. I have experience across web, desktop, mobile and enterprise services, plus system-to-system integrations in large environments.',
  },
  {
    pt: 'Também atuo na fronteira com <strong>DevOps</strong>: pipelines de CI/CD, testes automatizados com xUnit, qualidade de código com SonarQube, administração de servidores Windows e Linux, deploy via IIS, containers com Docker e orquestração com Ansible.',
    en: 'I also work at the <strong>DevOps</strong> frontier: CI/CD pipelines, automated testing with xUnit, code quality with SonarQube, Windows and Linux server administration, IIS deployments, Docker containers and Ansible orchestration.',
  },
  {
    pt: 'Atualmente venho aplicando <strong>Inteligência Artificial</strong> ao fluxo de desenvolvimento — automação com Claude CLI, execução local de modelos com Ollama e técnicas de <em>AI-Jail</em> para isolar e restringir o escopo de atuação de agentes.',
    en: 'Right now I am applying <strong>Artificial Intelligence</strong> to the development workflow — automation with Claude CLI, running models locally with Ollama, and <em>AI-Jail</em> techniques to isolate and constrain the scope of AI agents.',
  },
]

export type SkillGroup = {
  title: Localized
  icon: string
  items: string[]
}

export const skills: SkillGroup[] = [
  {
    title: { pt: 'Back-end', en: 'Back-end' },
    icon: 'server',
    items: ['C#', 'ASP.NET Core', '.NET Framework', 'Web API REST', 'Java 7–17', 'Node.js', 'Python', 'Entity Framework', 'xUnit', 'RabbitMQ'],
  },
  {
    title: { pt: 'Front-end', en: 'Front-end' },
    icon: 'layout',
    items: ['TypeScript', 'JavaScript', 'React.js', 'Blazor', 'Razor Pages', 'HTML5', 'CSS3', 'jQuery'],
  },
  {
    title: { pt: 'Banco de dados', en: 'Databases' },
    icon: 'database',
    items: ['Oracle', 'PostgreSQL', 'MySQL', 'SQL Server', 'Modelagem', 'Procedures', 'Tuning de performance'],
  },
  {
    title: { pt: 'DevOps & Infra', en: 'DevOps & Infra' },
    icon: 'cog',
    items: ['Docker', 'Ansible', 'CI/CD', 'GitHub Actions', 'GitLab CI', 'IIS', 'Nginx', 'Linux', 'Windows Server', 'SonarQube'],
  },
  {
    title: { pt: 'Observabilidade', en: 'Observability' },
    icon: 'chart',
    items: ['Elasticsearch', 'Logstash', 'Kibana', 'Análise de logs', 'Kubernetes', 'Docker Swarm'],
  },
  {
    title: { pt: 'Mobile & Multiplataforma', en: 'Mobile & Cross-platform' },
    icon: 'phone',
    items: ['Flutter', 'Dart', 'Kotlin Multiplatform', 'Compose Multiplatform', '.NET MAUI'],
  },
  {
    title: { pt: 'IA & Automação', en: 'AI & Automation' },
    icon: 'sparkles',
    items: ['Claude CLI', 'Ollama', 'Modelos locais', 'AI-Jail / sandboxing', 'Automação de tarefas'],
  },
  {
    title: { pt: 'Práticas', en: 'Practices' },
    icon: 'check',
    items: ['SOLID', 'DDD', 'Clean Architecture', 'Git', 'Kanban', 'Code Review', 'Testes automatizados'],
  },
]

export type Project = {
  name: string
  summary: Localized
  detail: Localized
  tags: string[]
  live?: string
  repo?: string
  featured: boolean
}

export const projects: Project[] = [
  {
    name: 'FiscalHub',
    summary: {
      pt: 'Gerenciador de renda individual e familiar',
      en: 'Personal and family income manager',
    },
    detail: {
      pt: 'Aplicação full stack para controle financeiro doméstico: lançamentos, categorias, metas e relatórios consolidados por membro da família. API em .NET com front-end em React/TypeScript.',
      en: 'Full stack application for household finance: transactions, categories, goals and consolidated reports per family member. .NET API with a React/TypeScript front end.',
    },
    tags: ['.NET', 'C#', 'React', 'TypeScript', 'PostgreSQL'],
    live: 'https://usefiscalhub.vercel.app/',
    featured: true,
  },
  {
    name: 'Nexus',
    summary: {
      pt: 'Gerenciador de projetos e equipes',
      en: 'Project and team management platform',
    },
    detail: {
      pt: 'Plataforma de gestão de projetos com quadros, acompanhamento de tarefas e organização de times. Publicada em servidor próprio com deploy via IIS.',
      en: 'Project management platform with boards, task tracking and team organization. Deployed on a self-managed server via IIS.',
    },
    tags: ['ASP.NET Core', 'C#', 'IIS', 'SQL Server'],
    live: 'https://usenexus.runasp.net/',
    featured: true,
  },
  {
    name: 'Observabilidade com ELK + Ansible',
    summary: {
      pt: 'Ambiente corporativo de análise de logs, 100% orquestrado',
      en: 'Fully orchestrated enterprise log analysis environment',
    },
    detail: {
      pt: 'Ambiente provisionado do zero com Ansible subindo SonarQube, PostgreSQL, a stack ELK (Elasticsearch, Logstash e Kibana) e Nginx como proxy reverso. A solução analisa logs dos servidores IIS e identifica requisições maliciosas, volume de erros por aplicação e sistemas ociosos.',
      en: 'Environment provisioned from scratch with Ansible, bringing up SonarQube, PostgreSQL, the ELK stack (Elasticsearch, Logstash, Kibana) and Nginx as a reverse proxy. It analyzes IIS server logs to flag malicious requests, error volume per application and unused systems.',
    },
    tags: ['Ansible', 'Elasticsearch', 'Kibana', 'Nginx', 'SonarQube', 'Docker'],
    repo: 'https://github.com/gentilpedro/Ansible_lab',
    featured: true,
  },
  {
    name: 'Beep',
    summary: {
      pt: 'Acessibilidade sonora para pessoas com perda auditiva',
      en: 'Sound accessibility for people with hearing loss',
    },
    detail: {
      pt: 'Projeto de acessibilidade que detecta e traduz eventos sonoros do ambiente em alertas visuais, voltado a pessoas com perda ou deficiência auditiva.',
      en: 'Accessibility project that detects environmental sound events and turns them into visual alerts for people with hearing loss or impairment.',
    },
    tags: ['Python', 'Acessibilidade', 'Áudio'],
    featured: true,
  },
  {
    name: 'EscolaSystem',
    summary: {
      pt: 'Sistema de gestão escolar (API + Web)',
      en: 'School management system (API + Web)',
    },
    detail: {
      pt: 'Sistema completo de gestão escolar dividido em API RESTful em ASP.NET Core e front-end em React com TypeScript, cobrindo cadastro de alunos, turmas e rotinas administrativas.',
      en: 'Complete school management system split into an ASP.NET Core RESTful API and a React + TypeScript front end, covering student records, classes and administrative routines.',
    },
    tags: ['ASP.NET Core', 'C#', 'React', 'TypeScript'],
    repo: 'https://github.com/gentilpedro/EscolaSystemAPI',
    featured: true,
  },
  {
    name: 'PyInvest',
    summary: {
      pt: 'Análise de ações para decisão de compra',
      en: 'Stock analysis for buying decisions',
    },
    detail: {
      pt: 'Ferramenta em Python que coleta e avalia indicadores de ações da bolsa para apontar as melhores oportunidades de compra segundo critérios configuráveis.',
      en: 'Python tool that collects and evaluates stock indicators to surface the best buying opportunities according to configurable criteria.',
    },
    tags: ['Python', 'Dados', 'Automação'],
    repo: 'https://github.com/gentilpedro/PyInvest',
    featured: true,
  },
  {
    name: 'Representantes',
    summary: {
      pt: 'App mobile de força de vendas com API própria',
      en: 'Mobile sales-force app with its own API',
    },
    detail: {
      pt: 'Aplicativo mobile em Flutter/Dart para representantes comerciais, integrado a uma API RESTful em C# responsável por pedidos, clientes e catálogo.',
      en: 'Flutter/Dart mobile app for sales representatives, integrated with a C# RESTful API handling orders, customers and catalog.',
    },
    tags: ['Flutter', 'Dart', 'C#', 'REST API'],
    repo: 'https://github.com/gentilpedro/Representantes',
    featured: true,
  },
  {
    name: 'Dev Templates',
    summary: {
      pt: 'Starters .NET DDD, .NET SOLID, Blazor, React e Python CLI',
      en: '.NET DDD, .NET SOLID, Blazor, React and Python CLI starters',
    },
    detail: {
      pt: 'Coleção de templates prontos para produção que padronizam o início de novos projetos: Web API em DDD, Web API orientada a SOLID, Blazor 10, React + Vite e CLI em Python.',
      en: 'A collection of production-ready templates that standardize how new projects start: DDD Web API, SOLID-oriented Web API, Blazor 10, React + Vite and a Python CLI.',
    },
    tags: ['.NET', 'DDD', 'SOLID', 'Blazor', 'React', 'Python'],
    repo: 'https://github.com/gentilpedro?tab=repositories&q=template',
    featured: true,
  },
]

export type Job = {
  role: Localized
  company: string
  period: Localized
  current?: boolean
  bullets: Localized[]
  stack: string[]
}

export const experience: Job[] = [
  {
    role: { pt: 'Desenvolvedor de Software', en: 'Software Developer' },
    company: 'Josapar',
    period: { pt: 'Ago 2025 — Atual', en: 'Aug 2025 — Present' },
    current: true,
    bullets: [
      {
        pt: 'Desenvolvimento de novos projetos e evolução de sistemas legados em <strong>ASP.NET Core</strong> e .NET Framework, atuando em aplicações web, desktop, mobile e console.',
        en: 'Building new projects and evolving legacy systems in <strong>ASP.NET Core</strong> and .NET Framework, across web, desktop, mobile and console applications.',
      },
      {
        pt: 'Construí um ambiente totalmente orquestrado com <strong>Ansible</strong>, provisionando SonarQube, PostgreSQL, a stack <strong>ELK</strong> e Nginx como proxy reverso para análise dos logs dos servidores IIS.',
        en: 'Built a fully orchestrated environment with <strong>Ansible</strong>, provisioning SonarQube, PostgreSQL, the <strong>ELK</strong> stack and Nginx as a reverse proxy to analyze IIS server logs.',
      },
      {
        pt: 'A solução identifica requisições maliciosas, volume de erros por aplicação e sistemas sem uso, apoiando decisões de segurança e de desativação de aplicações.',
        en: 'The solution flags malicious requests, error volume per application and unused systems, supporting security and application-decommissioning decisions.',
      },
      {
        pt: 'Criação e integração de <strong>APIs RESTful</strong>; participação em mais de <strong>200 projetos</strong>, com sistemas usados diariamente por mais de <strong>2.000 funcionários</strong> e economia superior a <strong>R$ 50 mil/dia</strong>.',
        en: 'Design and integration of <strong>RESTful APIs</strong>; involvement in over <strong>200 projects</strong>, with systems used daily by more than <strong>2,000 employees</strong> and savings above <strong>R$ 50k/day</strong>.',
      },
    ],
    stack: ['C#', 'ASP.NET Core', '.NET Framework', 'Ansible', 'ELK', 'SonarQube', 'PostgreSQL', 'Nginx', 'IIS'],
  },
  {
    role: { pt: 'Desenvolvedor de Software', en: 'Software Developer' },
    company: 'Mertins Tecnologia',
    period: { pt: 'Jan 2025 — Ago 2025', en: 'Jan 2025 — Aug 2025' },
    bullets: [
      {
        pt: 'Desenvolvimento e manutenção do ERP da empresa em <strong>Java 17</strong>, incluindo manutenção de <strong>APIs RESTful</strong>.',
        en: 'Development and maintenance of the company ERP in <strong>Java 17</strong>, including maintenance of <strong>RESTful APIs</strong>.',
      },
      {
        pt: 'Implementação de features, correção de bugs e manutenção de relatórios automatizados com <strong>Jasper Reports</strong>.',
        en: 'Feature implementation, bug fixing and maintenance of automated reports with <strong>Jasper Reports</strong>.',
      },
      {
        pt: 'Responsável pela criação de novos clientes no sistema e pela migração de clientes legados, com forte uso de <strong>consultas SQL otimizadas</strong> para análise de dados.',
        en: 'Responsible for onboarding new clients into the system and migrating legacy clients, relying heavily on <strong>optimized SQL queries</strong> for data analysis.',
      },
    ],
    stack: ['Java 17', 'REST API', 'Jasper Reports', 'SQL'],
  },
  {
    role: { pt: 'Professor Instrutor de Robótica', en: 'Robotics Instructor' },
    company: 'SESI',
    period: { pt: 'Out 2024 — Dez 2024', en: 'Oct 2024 — Dec 2024' },
    bullets: [
      {
        pt: 'Instrutor em ação social do SESI levando lógica de programação e fundamentos de robótica a escolas atingidas pelas <strong>enchentes do Rio Grande do Sul</strong>.',
        en: 'Instructor in a SESI social program bringing programming logic and robotics fundamentals to schools affected by the <strong>Rio Grande do Sul floods</strong>.',
      },
      {
        pt: 'Atuação em diversas escolas de Pelotas e região, ensinando crianças e adolescentes.',
        en: 'Taught children and teenagers across several schools in Pelotas and the surrounding region.',
      },
    ],
    stack: [
      'Robótica',
      'Lógica de programação',
      'Educação',
    ],
  },
  {
    role: { pt: 'Desenvolvedor de Software', en: 'Software Developer' },
    company: 'APH Net',
    period: { pt: 'Jan 2023 — Jun 2024', en: 'Jan 2023 — Jun 2024' },
    bullets: [
      {
        pt: 'Desenvolvimento e manutenção do projeto ERP da empresa em <strong>Java 7 e 8</strong>.',
        en: 'Development and maintenance of the company ERP project in <strong>Java 7 and 8</strong>.',
      },
      {
        pt: 'Implementação de features, correção de bugs e manutenção de relatórios automatizados com <strong>Jasper Reports</strong>.',
        en: 'Feature implementation, bug fixing and maintenance of automated reports with <strong>Jasper Reports</strong>.',
      },
      {
        pt: 'Criação de novos clientes no sistema, migração de clientes antigos e escrita de <strong>consultas SQL otimizadas</strong> para análise de dados.',
        en: 'Onboarding new clients, migrating legacy ones and writing <strong>optimized SQL queries</strong> for data analysis.',
      },
    ],
    stack: ['Java 7/8', 'Jasper Reports', 'SQL', 'ERP'],
  },
]

export const education = {
  degree: {
    pt: 'Análise e Desenvolvimento de Sistemas',
    en: 'Systems Analysis and Development',
  } as Localized,
  school: {
    pt: 'Universidade de Tecnologia SENAC — Pelotas, RS',
    en: 'SENAC University of Technology — Pelotas, RS, Brazil',
  } as Localized,
  period: '2023 — 2026',
  description: {
    pt: 'Base teórica e prática em projeto, desenvolvimento e gestão de sistemas de software, cobrindo programação, inteligência artificial, banco de dados, engenharia de software, redes e sistemas operacionais.',
    en: 'Theoretical and practical foundation in designing, building and managing software systems, covering programming, artificial intelligence, databases, software engineering, networks and operating systems.',
  } as Localized,
}

export type Course = { name: string; year: string }

export const courses: Course[] = [
  { name: 'DevOps — Mão na massa!', year: '2026' },
  { name: 'Docker para Desenvolvedores (Swarm e Kubernetes)', year: '2026' },
  { name: 'Ansible para SysAdmin', year: '2026' },
  { name: 'Elasticsearch 9: Buscas, Índices e Dashboards', year: '2026' },
  { name: '.NET Core: orientado para o mercado de trabalho', year: '2026' },
  { name: 'Web API ASP.NET Core Essencial (.NET 8 / .NET 9)', year: '2026' },
  { name: 'Formação Front-end — HTML, CSS, JavaScript e React', year: '2026' },
  { name: 'Kotlin Multiplataforma na Prática com Compose', year: '2026' },
  { name: 'Flutter — Apps para Android e iOS', year: '2026' },
  { name: 'ASP.NET Core MVC', year: '2025' },
  { name: 'C# Essential (.NET 9.0, LINQ e IA)', year: '2025' },
  { name: 'CI/CD com GitLab', year: '2025' },
  { name: 'Microsoft Windows Server 2019', year: '2025' },
]

export const languages: { name: Localized; level: Localized; pct: number }[] = [
  {
    name: { pt: 'Português', en: 'Portuguese' },
    level: { pt: 'Nativo', en: 'Native' },
    pct: 100,
  },
  {
    name: { pt: 'Inglês', en: 'English' },
    level: { pt: 'Básico — leitura técnica fluente', en: 'Basic — fluent technical reading' },
    pct: 40,
  },
  {
    name: { pt: 'Espanhol', en: 'Spanish' },
    level: { pt: 'Básico', en: 'Basic' },
    pct: 30,
  },
]
