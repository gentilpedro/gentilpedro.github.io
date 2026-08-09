import type { AnchorHTMLAttributes, ReactNode } from 'react'

/** Faixa central de conteúdo, largura máxima do tema (`--container-page`). */
export function Wrap({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div className={`mx-auto w-full max-w-page px-6 max-[760px]:px-[18px] ${className}`}>
      {children}
    </div>
  )
}

export function Section({
  id,
  children,
  className = '',
}: {
  id: string
  children: ReactNode
  className?: string
}) {
  return (
    <section
      id={id}
      className={`border-t border-line py-24 max-[760px]:py-[68px] print:break-inside-avoid print:py-4 ${className}`}
    >
      <Wrap>{children}</Wrap>
    </section>
  )
}

export function SectionHead({
  kicker,
  title,
  lead,
}: {
  kicker: string
  title: string
  lead?: string
}) {
  return (
    <div className="reveal mb-12 max-w-[680px]">
      <span className="mb-3.5 inline-flex items-center gap-2 text-[0.78rem] font-semibold tracking-[0.09em] text-accent uppercase before:h-0.5 before:w-[22px] before:rounded-full before:bg-accent before:content-['']">
        {kicker}
      </span>
      <h2 className="text-[clamp(1.75rem,4vw,2.5rem)]">{title}</h2>
      {lead && <p className="mt-3.5 text-[1.05rem] text-muted">{lead}</p>}
    </div>
  )
}

export function Card({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div className={`rounded-panel border border-line bg-elevated p-[26px] shadow-sm ${className}`}>
      {children}
    </div>
  )
}

export function CardTitle({
  children,
  className = '',
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <div
      className={`mb-[18px] flex items-center gap-1.5 text-[0.78rem] font-bold tracking-[0.08em] text-faint uppercase ${className}`}
    >
      {children}
    </div>
  )
}

export function Tag({ children }: { children: ReactNode }) {
  return (
    <li className="rounded-[7px] border border-transparent bg-inset px-2.5 py-1 font-mono text-[0.8rem] font-medium tracking-[-0.01em] text-muted group-hover:border-line">
      {children}
    </li>
  )
}

export function TagList({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <ul className={`flex flex-wrap gap-[7px] ${className}`}>{children}</ul>
}

const BUTTON_VARIANTS = {
  primary: 'bg-accent text-accent-contrast hover:bg-accent-hover hover:shadow-md',
  ghost: 'bg-elevated border-line text-fg hover:border-line-strong hover:text-fg',
  whatsapp: 'bg-whatsapp text-whatsapp-fg hover:bg-whatsapp-hover hover:shadow-md',
} as const

type ButtonProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  variant?: keyof typeof BUTTON_VARIANTS
  size?: 'md' | 'sm'
}

/** Todos os CTAs do site são links, então o botão renderiza `<a>`. */
export function Button({
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  ...rest
}: ButtonProps) {
  const sizing = size === 'sm' ? 'px-3.5 py-2 text-[0.86rem]' : 'px-[22px] py-3 text-[0.95rem]'

  return (
    <a
      className={`inline-flex items-center justify-center gap-[9px] rounded-[10px] border border-transparent font-semibold whitespace-nowrap transition-all duration-200 hover:-translate-y-px max-[480px]:flex-auto ${sizing} ${BUTTON_VARIANTS[variant]} ${className}`}
      {...rest}
    >
      {children}
    </a>
  )
}

/** Selo de versão/tamanho exibido dentro de um botão. */
export function ButtonMeta({ children }: { children: ReactNode }) {
  return (
    <span className="rounded-full bg-black/15 px-[7px] py-0.5 text-[0.74rem] font-semibold tracking-[0.02em] opacity-85">
      {children}
    </span>
  )
}

const ICON_BUTTON_BASE =
  'grid h-[38px] place-items-center rounded-[9px] border border-line bg-elevated text-muted transition-all duration-150 hover:border-line-strong hover:text-fg'

/** `wide` troca o quadrado 38x38 por uma pílula que acomoda texto (ex: "EN"). */
const iconButtonClass = (wide?: boolean) =>
  `${ICON_BUTTON_BASE} ${wide ? 'px-3 text-[0.82rem] font-bold tracking-[0.04em]' : 'w-[38px]'}`

export function IconLink({
  className = '',
  children,
  ...rest
}: AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a className={`${iconButtonClass()} ${className}`} {...rest}>
      {children}
    </a>
  )
}

export function IconButton({
  wide,
  className = '',
  children,
  ...rest
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { wide?: boolean }) {
  return (
    <button type="button" className={`${iconButtonClass(wide)} ${className}`} {...rest}>
      {children}
    </button>
  )
}

/** Bolinha pulsante usada nos selos de "disponível" e "live". */
export function PulseDot() {
  return <span className="h-[7px] w-[7px] animate-pulse-dot rounded-full bg-current" />
}
