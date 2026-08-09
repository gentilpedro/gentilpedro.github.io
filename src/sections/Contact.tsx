import { Icon } from '../components/Icon'
import { profile, whatsappLink } from '../data/profile'
import type { Lang } from '../data/profile'
import { tr } from '../data/ui'

export function Contact({ lang }: { lang: Lang }) {
  const wa = whatsappLink(lang)

  const cards = [
    { icon: 'mail', label: 'E-mail', value: profile.email, href: `mailto:${profile.email}` },
    {
      icon: 'whatsapp',
      label: 'WhatsApp',
      value: profile.phone,
      href: wa,
      external: true,
    },
    {
      icon: 'linkedin',
      label: 'LinkedIn',
      value: '/in/pedro-gentil',
      href: profile.linkedinUrl,
      external: true,
    },
    {
      icon: 'github',
      label: 'GitHub',
      value: `@${profile.github}`,
      href: profile.githubUrl,
      external: true,
    },
  ]

  return (
    <section className="section contact" id="contato">
      <div className="wrap">
        <div className="section__head reveal">
          <span className="kicker">{tr('sectionContactKicker', lang)}</span>
          <h2 className="section__title">{tr('sectionContact', lang)}</h2>
          <p className="section__lead">{tr('sectionContactLead', lang)}</p>
        </div>

        <div className="contact__grid">
          {cards.map((c) => (
            <a
              className="contact__card reveal"
              key={c.label}
              href={c.href}
              {...(c.external ? { target: '_blank', rel: 'noreferrer' } : {})}
            >
              <span className="contact__icon">
                <Icon name={c.icon} size={20} />
              </span>
              <span>
                <span className="contact__label">{c.label}</span>
                <span className="contact__value" style={{ display: 'block' }}>
                  {c.value}
                </span>
              </span>
            </a>
          ))}
        </div>

        <div
          className="reveal"
          style={{ marginTop: 36, display: 'flex', gap: 12, flexWrap: 'wrap' }}
        >
          <a className="btn btn--primary" href={`mailto:${profile.email}`}>
            <Icon name="mail" size={17} />
            {tr('ctaContact', lang)}
          </a>
          <a
            className="btn btn--whatsapp"
            href={wa}
            target="_blank"
            rel="noreferrer"
            title={tr('ctaWhatsapp', lang)}
          >
            <Icon name="whatsapp" size={17} />
            {tr('ctaWhatsapp', lang)}
          </a>
          <a className="btn btn--ghost" href={profile.cv} download>
            <Icon name="download" size={17} />
            {tr('ctaCv', lang)}
          </a>
        </div>
      </div>
    </section>
  )
}
