import { useEffect, useState } from 'react'
import { Menu, Moon, Sun, X } from 'lucide-react'
import { IconButton, Wrap } from './ui'
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
    <header
      className={`sticky top-0 z-50 border-b bg-bg/85 backdrop-blur-[14px] backdrop-saturate-[180%] transition-[border-color,box-shadow] duration-200 print:hidden ${
        scrolled ? 'border-line shadow-sm' : 'border-transparent'
      }`}
    >
      <Wrap className="flex h-[68px] items-center gap-4">
        <a
          href="#top"
          className="group mr-auto flex items-baseline gap-2 whitespace-nowrap text-fg"
          onClick={() => setOpen(false)}
        >
          <span className="text-[1.02rem] font-bold tracking-[-0.02em]">
            {tr('brandTitle', lang)}
          </span>
          {/* Entre 760 e 940px o menu já disputa espaço com a marca, então some o nome. */}
          <span className="font-normal text-line-strong max-[940px]:hidden" aria-hidden="true">
            ·
          </span>
          <span className="text-[0.95rem] font-medium text-muted transition-colors duration-150 group-hover:text-fg max-[940px]:hidden">
            {profile.shortName}
          </span>
        </a>

        <nav
          aria-label="Menu principal"
          className={`flex gap-1 max-[760px]:fixed max-[760px]:inset-x-0 max-[760px]:top-[68px] max-[760px]:flex-col max-[760px]:gap-0.5 max-[760px]:border-b max-[760px]:border-line max-[760px]:bg-bg max-[760px]:px-5 max-[760px]:pt-3.5 max-[760px]:pb-[22px] max-[760px]:shadow-lg max-[760px]:transition-transform max-[760px]:duration-300 ${
            open ? 'max-[760px]:translate-y-0' : 'max-[760px]:-translate-y-[140%]'
          }`}
        >
          {SECTIONS.map((id) => (
            <a
              key={id}
              href={`#${id}`}
              onClick={() => setOpen(false)}
              className={`rounded-lg px-3 py-2 text-[0.92rem] font-medium transition-colors duration-150 hover:bg-inset hover:text-fg max-[760px]:p-3 max-[760px]:text-base ${
                active === id ? 'bg-inset text-fg' : 'text-muted'
              }`}
            >
              {tr(NAV_KEYS[id], lang)}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <IconButton
            wide
            onClick={onToggleLang}
            title={tr('langToggle', lang)}
            aria-label={tr('langToggle', lang)}
          >
            {lang === 'pt' ? 'EN' : 'PT'}
          </IconButton>

          <IconButton
            onClick={onToggleTheme}
            title={tr('themeToggle', lang)}
            aria-label={tr('themeToggle', lang)}
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </IconButton>

          <div className="hidden max-[760px]:block">
            <IconButton onClick={() => setOpen((v) => !v)} aria-label="Menu" aria-expanded={open}>
              {open ? <X size={18} /> : <Menu size={18} />}
            </IconButton>
          </div>
        </div>
      </Wrap>
    </header>
  )
}
