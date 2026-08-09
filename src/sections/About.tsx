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
    <section className="section" id="sobre">
      <div className="wrap">
        <div className="section__head reveal">
          <span className="kicker">{tr('sectionAboutKicker', lang)}</span>
          <h2 className="section__title">{tr('sectionAbout', lang)}</h2>
        </div>

        <div className="about__grid">
          <div className="about__text reveal">
            {about.map((p, i) => (
              <p key={i} dangerouslySetInnerHTML={{ __html: p[lang] }} />
            ))}
          </div>

          <div className="reveal">
            <div className="card" style={{ marginBottom: 18 }}>
              <div className="card__title">{lang === 'pt' ? 'Resumo' : 'At a glance'}</div>
              <dl className="factlist">
                {facts.map((f) => (
                  <li key={f.dt}>
                    <dt>{f.dt}</dt>
                    <dd>{f.dd}</dd>
                  </li>
                ))}
              </dl>
            </div>

            <div className="card">
              <div className="card__title">{tr('languages', lang)}</div>
              <div className="langbar">
                {languages.map((l) => (
                  <div className="langbar__row" key={l.name.en}>
                    <div className="langbar__head">
                      <strong>{l.name[lang]}</strong>
                      <span className="langbar__level">{l.level[lang]}</span>
                    </div>
                    <div
                      className="langbar__track"
                      role="progressbar"
                      aria-valuenow={l.pct}
                      aria-valuemin={0}
                      aria-valuemax={100}
                      aria-label={l.name[lang]}
                    >
                      <div className="langbar__fill" style={{ width: `${l.pct}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
