import { useEffect, useState } from 'react'
import { Header } from './components/Header'
import { Icon } from './components/Icon'
import { Hero } from './sections/Hero'
import { About } from './sections/About'
import { Skills } from './sections/Skills'
import { Projects } from './sections/Projects'
import { Experience } from './sections/Experience'
import { Education } from './sections/Education'
import { Contact } from './sections/Contact'
import { profile } from './data/profile'
import type { Lang } from './data/profile'
import { tr } from './data/ui'
import { useReveal } from './hooks/useReveal'

type Theme = 'light' | 'dark'

function initialLang(): Lang {
  const saved = localStorage.getItem('lang')
  if (saved === 'pt' || saved === 'en') return saved
  return navigator.language.toLowerCase().startsWith('pt') ? 'pt' : 'en'
}

function initialTheme(): Theme {
  const saved = localStorage.getItem('theme')
  if (saved === 'light' || saved === 'dark') return saved
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

export default function App() {
  const [lang, setLang] = useState<Lang>(initialLang)
  const [theme, setTheme] = useState<Theme>(initialTheme)

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    localStorage.setItem('theme', theme)
  }, [theme])

  useEffect(() => {
    document.documentElement.lang = lang === 'pt' ? 'pt-BR' : 'en'
    localStorage.setItem('lang', lang)
    document.title =
      lang === 'pt'
        ? `${profile.shortName} — Desenvolvedor Full Stack .NET`
        : `${profile.shortName} — Full Stack .NET Developer`
  }, [lang])

  useReveal([lang])

  return (
    <>
      <Header
        lang={lang}
        theme={theme}
        onToggleLang={() => setLang((l) => (l === 'pt' ? 'en' : 'pt'))}
        onToggleTheme={() => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))}
      />

      <main>
        <Hero lang={lang} />
        <About lang={lang} />
        <Skills lang={lang} />
        <Projects lang={lang} />
        <Experience lang={lang} />
        <Education lang={lang} />
        <Contact lang={lang} />
      </main>

      <footer className="footer">
        <div className="wrap footer__inner">
          <span>
            © {new Date().getFullYear()} {profile.name}. {tr('rights', lang)}
          </span>
          <span>{tr('builtWith', lang)}</span>
          <a href="#top">
            {tr('toTop', lang)} <Icon name="arrowUp" size={13} />
          </a>
        </div>
      </footer>
    </>
  )
}
