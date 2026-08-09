import { useOutletContext } from 'react-router-dom'
import type { Lang } from '../data/profile'

/** Idioma escolhido no Layout, repassado às páginas pelo contexto do Outlet. */
export function useLang(): Lang {
  return useOutletContext<{ lang: Lang }>().lang
}
