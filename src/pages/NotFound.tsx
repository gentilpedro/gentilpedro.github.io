import { Link } from 'react-router-dom'
import { Wrap } from '../components/ui'
import { useLang } from '../hooks/useLang'

export function NotFound() {
  const lang = useLang()

  return (
    <Wrap className="flex min-h-[60vh] flex-col items-center justify-center py-24 text-center">
      <span className="font-mono text-[0.82rem] font-semibold tracking-[0.09em] text-accent uppercase">
        404
      </span>
      <h1 className="mt-3 text-[clamp(1.75rem,4vw,2.5rem)]">
        {lang === 'pt' ? 'Página não encontrada' : 'Page not found'}
      </h1>
      <p className="mt-3.5 max-w-[440px] text-[1.05rem] text-muted">
        {lang === 'pt'
          ? 'O endereço que você abriu não existe neste site.'
          : 'The address you opened does not exist on this site.'}
      </p>
      <Link
        to="/"
        className="mt-7 inline-flex items-center justify-center rounded-[10px] bg-accent px-[22px] py-3 text-[0.95rem] font-semibold text-accent-contrast transition-all duration-200 hover:-translate-y-px hover:bg-accent-hover hover:shadow-md"
      >
        {lang === 'pt' ? 'Voltar para o início' : 'Back to home'}
      </Link>
    </Wrap>
  )
}
