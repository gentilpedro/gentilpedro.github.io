import { experience } from '../data/profile'
import type { Lang } from '../data/profile'
import { tr } from '../data/ui'

export function Experience({ lang }: { lang: Lang }) {
  return (
    <section className="section" id="experiencia">
      <div className="wrap">
        <div className="section__head reveal">
          <span className="kicker">{tr('sectionExperienceKicker', lang)}</span>
          <h2 className="section__title">{tr('sectionExperience', lang)}</h2>
        </div>

        <div className="timeline">
          {experience.map((job) => (
            <article
              className={`job reveal${job.current ? ' job--current' : ''}`}
              key={job.company + job.period.en}
            >
              <div className="job__head">
                <h3 className="job__role">{job.role[lang]}</h3>
                {job.current && <span className="job__badge">{tr('current', lang)}</span>}
              </div>

              <div className="job__meta">
                <span className="job__company">{job.company}</span>
                <span aria-hidden="true">·</span>
                <span>{job.period[lang]}</span>
                <span aria-hidden="true">·</span>
                <span>Pelotas, RS</span>
              </div>

              <ul className="job__bullets">
                {job.bullets.map((b, i) => (
                  <li key={i} dangerouslySetInnerHTML={{ __html: b[lang] }} />
                ))}
              </ul>

              <ul className="tags job__stack">
                {job.stack.map((s) => (
                  <li className="tag" key={s}>
                    {s}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
