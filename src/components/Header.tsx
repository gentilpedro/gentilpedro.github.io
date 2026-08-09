import { useEffect, useState } from 'react'
import { Icon } from './Icon'
import { tr } from '../data/ui'
import type { Lang } from '../data/profile'
import { profile } from '../data/profile'
import { useActiveSection } from '../hooks/useReveal'

const SECTIONS = ['sobre', 'stack', 'projetos', 'experiencia', 'formacao', 'contato'] as const

const NAV_KEYS = {
  sobre: 'navAbout',
  stack: 'navSkills',
  projetos: 'navProjects',
  experiencia: 'navExperience',
  formacao: 'navEducation',
  contato: 'navContact',
} as const

type Props = {
  lang: Lang
  theme: 'light' | 'dark'
  onToggleLang: () => void
  onToggleTheme: () => void
}

export function Header({ lang, theme, onToggleLang, onToggleTheme }: Props) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const active = useActiveSection([...SECTIONS])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const onResize = () => window.innerWidth > 760 && setOpen(false)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  return (
    <header className={`header${scrolled ? ' header--scrolled' : ''}`}>
      <div className="wrap header__inner">
        <a href="#top" className="brand" onClick={() => setOpen(false)}>
          <span className="brand__mark">PG</span>
          <span>{profile.shortName}</span>
        </a>

        <nav className={`nav${open ? ' is-open' : ''}`} aria-label="Menu principal">
          {SECTIONS.map((id) => (
            <a
              key={id}
              href={`#${id}`}
              className={active === id ? 'is-active' : undefined}
              onClick={() => setOpen(false)}
            >
              {tr(NAV_KEYS[id], lang)}
            </a>
          ))}
        </nav>

        <div className="header__actions">
          <button
            className="icon-btn lang-btn"
            onClick={onToggleLang}
            title={tr('langToggle', lang)}
            aria-label={tr('langToggle', lang)}
          >
            {lang === 'pt' ? 'EN' : 'PT'}
          </button>
          <button
            className="icon-btn"
            onClick={onToggleTheme}
            title={tr('themeToggle', lang)}
            aria-label={tr('themeToggle', lang)}
          >
            <Icon name={theme === 'dark' ? 'sun' : 'moon'} />
          </button>
          <button
            className="icon-btn menu-btn"
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
            aria-expanded={open}
          >
            <Icon name={open ? 'close' : 'menu'} />
          </button>
        </div>
      </div>
    </header>
  )
}
