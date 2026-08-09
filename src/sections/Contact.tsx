import { Download, Mail } from 'lucide-react'
import type { ReactNode } from 'react'
import { BrandIcon } from '../components/BrandIcon'
import { Button, Section, SectionHead } from '../components/ui'
import { profile, whatsappLink } from '../data/profile'
import type { Lang } from '../data/profile'
import { tr } from '../data/ui'

export function Contact({ lang }: { lang: Lang }) {
  const wa = whatsappLink(lang)

  const cards: { icon: ReactNode; label: string; value: string; href: string; external?: boolean }[] =
    [
      {
        icon: <Mail size={20} />,
        label: 'E-mail',
        value: profile.email,
        href: `mailto:${profile.email}`,
      },
      {
        icon: <BrandIcon name="whatsapp" size={20} />,
        label: 'WhatsApp',
        value: profile.phone,
        href: wa,
        external: true,
      },
      {
        icon: <BrandIcon name="linkedin" size={20} />,
        label: 'LinkedIn',
        value: '/in/pedro-gentil',
        href: profile.linkedinUrl,
        external: true,
      },
      {
        icon: <BrandIcon name="github" size={20} />,
        label: 'GitHub',
        value: `@${profile.github}`,
        href: profile.githubUrl,
        external: true,
      },
    ]

  return (
    <Section id="contato" className="bg-subtle">
      <SectionHead
        kicker={tr('sectionContactKicker', lang)}
        title={tr('sectionContact', lang)}
        lead={tr('sectionContactLead', lang)}
      />

      <div className="mt-10 grid grid-cols-[repeat(auto-fit,minmax(258px,1fr))] gap-4">
        {cards.map((c) => (
          <a
            key={c.label}
            href={c.href}
            {...(c.external ? { target: '_blank', rel: 'noreferrer' } : {})}
            className="reveal flex items-center gap-3.5 rounded-card border border-line bg-elevated p-5 text-fg transition duration-200 hover:-translate-y-0.5 hover:border-accent hover:shadow-md print:hover:translate-y-0"
          >
            <span className="grid h-[42px] w-[42px] shrink-0 place-items-center rounded-[11px] bg-accent-soft text-accent">
              {c.icon}
            </span>
            <span>
              <span className="text-[0.76rem] font-semibold tracking-[0.07em] text-faint uppercase">
                {c.label}
              </span>
              {/* Quebra só se realmente não couber, e nunca no meio de uma palavra curta. */}
              <span className="block text-[0.9rem] font-semibold break-words">{c.value}</span>
            </span>
          </a>
        ))}
      </div>

      <div className="reveal mt-9 flex flex-wrap gap-3 print:hidden">
        <Button href={`mailto:${profile.email}`}>
          <Mail size={17} />
          {tr('ctaContact', lang)}
        </Button>
        <Button
          variant="whatsapp"
          href={wa}
          target="_blank"
          rel="noreferrer"
          title={tr('ctaWhatsapp', lang)}
        >
          <BrandIcon name="whatsapp" size={17} />
          {tr('ctaWhatsapp', lang)}
        </Button>
        <Button variant="ghost" href={profile.cv} download>
          <Download size={17} />
          {tr('ctaCv', lang)}
        </Button>
      </div>
    </Section>
  )
}
