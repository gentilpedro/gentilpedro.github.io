import { Card, CardTitle, Section, SectionHead } from '../components/ui'
import { about, languages, profile } from '../data/profile'
import type { Lang } from '../data/profile'
import { tr } from '../data/ui'

export function About({ lang }: { lang: Lang }) {
  const facts: { dt: string; dd: string }[] = [
    { dt: lang === 'pt' ? 'Localização' : 'Location', dd: profile.location[lang] },
    { dt: lang === 'pt' ? 'Empresa atual' : 'Current company', dd: profile.company },
    { dt: lang === 'pt' ? 'Cargo' : 'Role', dd: profile.role[lang] },
    {
      dt: lang === 'pt' ? 'Formação' : 'Education',
      dd: lang === 'pt' ? 'ADS — SENAC (2023/2026)' : 'Systems Analysis — SENAC (2023/2026)',
    },
    {
      dt: lang === 'pt' ? 'Modelo' : 'Work model',
      dd: lang === 'pt' ? 'Presencial, híbrido ou remoto' : 'On-site, hybrid or remote',
    },
  ]

  return (
    <Section id="sobre">
      <SectionHead kicker={tr('sectionAboutKicker', lang)} title={tr('sectionAbout', lang)} />

      <div className="grid grid-cols-[1.4fr_1fr] items-start gap-14 max-[900px]:grid-cols-1 max-[900px]:gap-8">
        <div className="reveal [&_em]:text-accent [&_em]:not-italic [&_strong]:font-semibold [&_strong]:text-fg">
          {about.map((p, i) => (
            <p
              key={i}
              className="mb-[18px] text-[1.02rem] text-muted"
              dangerouslySetInnerHTML={{ __html: p[lang] }}
            />
          ))}
        </div>

        <div className="reveal">
          <Card className="mb-[18px]">
            <CardTitle>{lang === 'pt' ? 'Resumo' : 'At a glance'}</CardTitle>
            <dl>
              {facts.map((f) => (
                <div
                  key={f.dt}
                  className="flex justify-between gap-4 border-b border-dashed border-line py-[11px] text-[0.93rem] last:border-b-0"
                >
                  <dt className="text-muted">{f.dt}</dt>
                  <dd className="text-right font-semibold">{f.dd}</dd>
                </div>
              ))}
            </dl>
          </Card>

          <Card>
            <CardTitle>{tr('languages', lang)}</CardTitle>
            <div className="mt-2">
              {languages.map((l) => (
                <div key={l.name.en} className="mb-4 last:mb-0">
                  <div className="mb-[7px] flex items-baseline justify-between gap-3 text-[0.9rem]">
                    <strong>{l.name[lang]}</strong>
                    <span className="text-[0.82rem] text-faint">{l.level[lang]}</span>
                  </div>
                  <div
                    role="progressbar"
                    aria-valuenow={l.pct}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-label={l.name[lang]}
                    className="h-1.5 overflow-hidden rounded-full bg-inset"
                  >
                    <div
                      className="h-full rounded-full bg-accent transition-[width] duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
                      style={{ width: `${l.pct}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </Section>
  )
}
