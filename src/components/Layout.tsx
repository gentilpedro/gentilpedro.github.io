import { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import { ArrowUp } from 'lucide-react'
import { Header } from './Header'
import { Wrap } from './ui'
import { profile } from '../data/profile'
import type { Lang } from '../data/profile'
import { tr } from '../data/ui'
import { useReveal } from '../hooks/useReveal'

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

export function Layout() {
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
    <div className="flex min-h-screen flex-col">
      <Header
        lang={lang}
        theme={theme}
        onToggleLang={() => setLang((l) => (l === 'pt' ? 'en' : 'pt'))}
        onToggleTheme={() => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))}
      />

      <main className="flex-1">
        <Outlet context={{ lang }} />
      </main>

      <footer className="border-t border-line py-9 print:hidden">
        <Wrap className="flex flex-wrap items-center justify-between gap-4 text-[0.87rem] text-faint">
          <span>
            © {new Date().getFullYear()} {profile.name}. {tr('rights', lang)}
          </span>
          <span>{tr('builtWith', lang)}</span>
          <a href="#top" className="inline-flex items-center gap-1.5 text-muted hover:text-accent">
            {tr('toTop', lang)} <ArrowUp size={13} />
          </a>
        </Wrap>
      </footer>
    </div>
  )
}
