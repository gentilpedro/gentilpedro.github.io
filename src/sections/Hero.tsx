import { Icon } from '../components/Icon'
import { hero, profile, stats } from '../data/profile'
import type { Lang } from '../data/profile'
import { tr } from '../data/ui'

export function Hero({ lang }: { lang: Lang }) {
  return (
    <section className="hero" id="top">
      <div className="wrap">
        <div className="hero__grid">
          <div>
            <span className="badge">
              <span className="badge__dot" />
              {profile.availability[lang]}
            </span>

            <h1 className="hero__name">{profile.name}</h1>

            <div className="hero__role">
              <span>{profile.role[lang]}</span>
              <span className="sep">/</span>
              <span className="at">@ {profile.company}</span>
            </div>

            <p
              className="hero__tagline"
              dangerouslySetInnerHTML={{ __html: hero.tagline[lang] }}
            />
            <p className="hero__intro">{hero.intro[lang]}</p>

            <div className="hero__meta">
              <span>
                <Icon name="location" size={15} />
                {profile.location[lang]}
              </span>
              <span>
                <Icon name="briefcase" size={15} />
                {profile.company}
              </span>
              <span>
                <Icon name="graduation" size={15} />
                SENAC — 2023/2026
              </span>
            </div>

            <div className="hero__cta">
              <a className="btn btn--primary" href="#contato">
                <Icon name="mail" size={17} />
                {tr('ctaContact', lang)}
              </a>
              <a className="btn btn--ghost" href={profile.cv} download>
                <Icon name="download" size={17} />
                {tr('ctaCv', lang)}
              </a>

              <div className="hero__socials">
                <a
                  className="icon-btn"
                  href={profile.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="GitHub"
                  title="GitHub"
                >
                  <Icon name="github" />
                </a>
                <a
                  className="icon-btn"
                  href={profile.linkedinUrl}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn"
                  title="LinkedIn"
                >
                  <Icon name="linkedin" />
                </a>
                <a
                  className="icon-btn"
                  href={profile.whatsapp}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="WhatsApp"
                  title="WhatsApp"
                >
                  <Icon name="whatsapp" />
                </a>
              </div>
            </div>
          </div>

          <div className="hero__photo">
            <img
              src={profile.avatar}
              alt={profile.name}
              width={260}
              height={260}
              fetchPriority="high"
            />
          </div>
        </div>

        <div className="stats reveal">
          {stats.map((s) => (
            <div className="stat" key={s.value + s.label.en}>
              <div className="stat__value">{s.value}</div>
              <div className="stat__label">{s.label[lang]}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
