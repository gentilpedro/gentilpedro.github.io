import { Briefcase, Download, GraduationCap, Mail, MapPin } from 'lucide-react'
import { BrandIcon } from '../components/BrandIcon'
import { Button, IconLink, PulseDot, Wrap } from '../components/ui'
import { hero, profile, stats, whatsappLink } from '../data/profile'
import type { Lang } from '../data/profile'
import { tr } from '../data/ui'

export function Hero({ lang }: { lang: Lang }) {
  const wa = whatsappLink(lang)

  return (
    <section
      id="top"
      className="relative overflow-hidden pt-[88px] pb-[72px] max-[760px]:pt-[52px] max-[760px]:pb-11"
    >
      {/* Brilho decorativo atrás do conteúdo. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-[30%] -right-[10%] h-[620px] w-[620px] bg-[radial-gradient(circle,var(--color-accent-soft)_0%,transparent_68%)]"
      />

      <Wrap className="relative">
        <div className="grid grid-cols-[1fr_auto] items-center gap-14 max-[900px]:grid-cols-1 max-[900px]:gap-9">
          <div>
            <span className="mb-[22px] inline-flex items-center gap-2 rounded-full bg-success-soft py-1.5 pr-3.5 pl-2.5 text-[0.84rem] font-semibold text-success">
              <PulseDot />
              {profile.availability[lang]}
            </span>

            <h1 className="mb-2.5 text-[clamp(2.1rem,6vw,3.5rem)] tracking-[-0.035em]">
              {profile.name}
            </h1>

            <div className="mb-5 flex flex-wrap items-center gap-2.5 text-[1.15rem] font-semibold text-accent max-[760px]:gap-x-2 max-[760px]:gap-y-0.5">
              <span>{profile.role[lang]}</span>
              {/* Sem espaço horizontal o cargo quebra de linha e a barra ficaria órfã. */}
              <span className="font-normal text-line-strong max-[760px]:hidden">/</span>
              <span className="font-medium text-muted">@ {profile.company}</span>
            </div>

            <p
              className="mb-4 max-w-[620px] text-[clamp(1.1rem,2.3vw,1.35rem)] leading-[1.45] font-medium [&_em]:text-accent [&_em]:not-italic"
              dangerouslySetInnerHTML={{ __html: hero.tagline[lang] }}
            />
            <p className="mb-[30px] max-w-[620px] text-muted">{hero.intro[lang]}</p>

            <div className="mb-[30px] flex flex-wrap gap-[18px] text-[0.9rem] text-muted">
              <span className="inline-flex items-center gap-[7px]">
                <MapPin size={15} />
                {profile.location[lang]}
              </span>
              <span className="inline-flex items-center gap-[7px]">
                <Briefcase size={15} />
                {profile.company}
              </span>
              <span className="inline-flex items-center gap-[7px]">
                <GraduationCap size={15} />
                SENAC — 2023/2026
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-3 print:hidden">
              <Button href="#contato">
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
                {tr('ctaWhatsappShort', lang)}
              </Button>
              <Button variant="ghost" href={profile.cv} download>
                <Download size={17} />
                {tr('ctaCv', lang)}
              </Button>

              <div className="ml-1 flex gap-2">
                <IconLink
                  href={profile.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="GitHub"
                  title="GitHub"
                >
                  <BrandIcon name="github" />
                </IconLink>
                <IconLink
                  href={profile.linkedinUrl}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn"
                  title="LinkedIn"
                >
                  <BrandIcon name="linkedin" />
                </IconLink>
                <IconLink
                  href={wa}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="WhatsApp"
                  title="WhatsApp"
                >
                  <BrandIcon name="whatsapp" />
                </IconLink>
              </div>
            </div>
          </div>

          <div className="relative max-[900px]:order-first">
            <img
              src={profile.avatar}
              alt={profile.name}
              width={260}
              height={260}
              fetchPriority="high"
              className="h-[260px] w-[260px] rounded-3xl border border-line object-cover shadow-lg max-[900px]:h-[150px] max-[900px]:w-[150px] max-[900px]:rounded-[20px]"
            />
            <div
              aria-hidden="true"
              className="absolute top-[14px] right-[-14px] bottom-[-14px] left-[14px] -z-10 rounded-3xl border-[1.5px] border-accent opacity-45 max-[900px]:hidden"
            />
          </div>
        </div>

        <div className="reveal mt-16 grid grid-cols-4 gap-px overflow-hidden rounded-panel border border-line bg-line max-[900px]:grid-cols-2 max-[480px]:grid-cols-1">
          {stats.map((s) => (
            <div
              key={s.value + s.label.en}
              className="bg-elevated px-[22px] py-[26px] transition-colors duration-200 hover:bg-subtle"
            >
              <div className="text-[clamp(1.6rem,3vw,2.1rem)] leading-[1.1] font-extrabold tracking-[-0.035em] text-accent">
                {s.value}
              </div>
              <div className="mt-1.5 text-[0.86rem] leading-[1.4] text-muted">{s.label[lang]}</div>
            </div>
          ))}
        </div>
      </Wrap>
    </section>
  )
}
