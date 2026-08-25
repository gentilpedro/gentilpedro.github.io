import type { Lang, Localized } from './profile'

export type UIKey =
  | 'brandTitle'
  | 'navAbout'
  | 'navSkills'
  | 'navProjects'
  | 'navExperience'
  | 'navEducation'
  | 'navContact'
  | 'ctaContact'
  | 'ctaCv'
  | 'ctaWhatsapp'
  | 'ctaWhatsappShort'
  | 'sectionAbout'
  | 'sectionAboutKicker'
  | 'sectionSkills'
  | 'sectionSkillsKicker'
  | 'sectionSkillsLead'
  | 'sectionProjects'
  | 'sectionProjectsKicker'
  | 'sectionProjectsLead'
  | 'sectionExperience'
  | 'sectionExperienceKicker'
  | 'sectionEducation'
  | 'sectionEducationKicker'
  | 'sectionContact'
  | 'sectionContactKicker'
  | 'sectionContactLead'
  | 'liveDemo'
  | 'sourceCode'
  | 'downloadApp'
  | 'downloadAppWindows'
  | 'ghActivity'
  | 'ghActivityLead'
  | 'ghRepos'
  | 'ghStars'
  | 'ghFollowers'
  | 'ghSince'
  | 'ghLatest'
  | 'ghError'
  | 'ghProfile'
  | 'noDescription'
  | 'projectsLoading'
  | 'courses'
  | 'languages'
  | 'current'
  | 'toTop'
  | 'builtWith'
  | 'rights'
  | 'themeToggle'
  | 'langToggle'
  | 'copy'
  | 'copied'
  | 'updated'

export const t: Record<UIKey, Localized> = {
  brandTitle: { pt: 'Meu Portfólio', en: 'My Portfolio' },

  navAbout: { pt: 'Sobre', en: 'About' },
  navSkills: { pt: 'Stack', en: 'Stack' },
  navProjects: { pt: 'Projetos', en: 'Projects' },
  navExperience: { pt: 'Experiência', en: 'Experience' },
  navEducation: { pt: 'Formação', en: 'Education' },
  navContact: { pt: 'Contato', en: 'Contact' },

  ctaContact: { pt: 'Fale comigo', en: 'Get in touch' },
  ctaCv: { pt: 'Baixar currículo', en: 'Download résumé' },
  ctaWhatsapp: { pt: 'Chamar no WhatsApp', en: 'Message on WhatsApp' },
  ctaWhatsappShort: { pt: 'WhatsApp', en: 'WhatsApp' },

  sectionAbout: { pt: 'Sobre mim', en: 'About me' },
  sectionAboutKicker: { pt: 'Quem sou', en: 'Who I am' },

  sectionSkills: { pt: 'Tecnologias', en: 'Tech stack' },
  sectionSkillsKicker: { pt: 'O que eu uso', en: 'What I use' },
  sectionSkillsLead: {
    pt: 'Ferramentas com as quais entrego software em produção — do código ao servidor.',
    en: 'Tools I use to ship software in production — from code to server.',
  },

  sectionProjects: { pt: 'Projetos em destaque', en: 'Featured projects' },
  sectionProjectsKicker: { pt: 'O que eu construí', en: 'What I built' },
  sectionProjectsLead: {
    pt: 'Uma seleção de projetos pessoais e corporativos. Todos os repositórios públicos estão no meu GitHub.',
    en: 'A selection of personal and enterprise projects. Every public repository lives on my GitHub.',
  },

  sectionExperience: { pt: 'Experiência profissional', en: 'Professional experience' },
  sectionExperienceKicker: { pt: 'Trajetória', en: 'Career path' },

  sectionEducation: { pt: 'Formação e cursos', en: 'Education & courses' },
  sectionEducationKicker: { pt: 'Aprendizado contínuo', en: 'Continuous learning' },

  sectionContact: { pt: 'Vamos conversar', en: "Let's talk" },
  sectionContactKicker: { pt: 'Contato', en: 'Contact' },
  sectionContactLead: {
    pt: 'Estou aberto a oportunidades, freelas e trocas técnicas. Respondo em até 24 horas.',
    en: 'I am open to opportunities, freelance work and technical conversations. I reply within 24 hours.',
  },

  liveDemo: { pt: 'Ver online', en: 'Live demo' },
  sourceCode: { pt: 'Código', en: 'Source' },
  downloadApp: { pt: 'Baixar app', en: 'Download app' },
  downloadAppWindows: { pt: 'Windows · .exe', en: 'Windows · .exe' },

  ghActivity: { pt: 'Atividade no GitHub', en: 'GitHub activity' },
  ghActivityLead: {
    pt: 'Dados carregados em tempo real direto da API do GitHub.',
    en: 'Data loaded live straight from the GitHub API.',
  },
  ghRepos: { pt: 'Repositórios públicos', en: 'Public repositories' },
  ghStars: { pt: 'Estrelas recebidas', en: 'Stars received' },
  ghFollowers: { pt: 'Seguidores', en: 'Followers' },
  ghSince: { pt: 'No GitHub desde', en: 'On GitHub since' },
  ghLatest: { pt: 'Últimos repositórios atualizados', en: 'Recently updated repositories' },
  ghError: {
    pt: 'Não foi possível carregar os dados do GitHub agora. Veja o perfil diretamente:',
    en: 'Could not load GitHub data right now. Visit the profile directly:',
  },
  ghProfile: { pt: 'Ver perfil completo no GitHub', en: 'View full GitHub profile' },
  noDescription: { pt: 'Sem descrição no repositório.', en: 'No description on the repository.' },
  projectsLoading: { pt: 'Carregando projetos do GitHub…', en: 'Loading projects from GitHub…' },

  courses: { pt: 'Cursos e certificações', en: 'Courses & certifications' },
  languages: { pt: 'Idiomas', en: 'Languages' },
  current: { pt: 'Atual', en: 'Current' },

  toTop: { pt: 'Voltar ao topo', en: 'Back to top' },
  builtWith: {
    pt: 'Feito com React, TypeScript e Vite. Publicado no GitHub Pages.',
    en: 'Built with React, TypeScript and Vite. Deployed on GitHub Pages.',
  },
  rights: { pt: 'Todos os direitos reservados.', en: 'All rights reserved.' },
  themeToggle: { pt: 'Alternar tema', en: 'Toggle theme' },
  langToggle: { pt: 'Mudar idioma', en: 'Change language' },
  copy: { pt: 'Copiar', en: 'Copy' },
  copied: { pt: 'Copiado!', en: 'Copied!' },
  updated: { pt: 'atualizado', en: 'updated' },
}

export function tr(key: UIKey, lang: Lang): string {
  return t[key][lang]
}
