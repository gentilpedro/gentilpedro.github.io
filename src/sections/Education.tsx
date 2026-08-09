import { Icon } from '../components/Icon'
import { courses, education } from '../data/profile'
import type { Lang } from '../data/profile'
import { tr } from '../data/ui'

export function Education({ lang }: { lang: Lang }) {
  return (
    <section className="section" id="formacao">
      <div className="wrap">
        <div className="section__head reveal">
          <span className="kicker">{tr('sectionEducationKicker', lang)}</span>
          <h2 className="section__title">{tr('sectionEducation', lang)}</h2>
        </div>

        <div className="edu__grid">
          <div className="card reveal">
            <div className="card__title">
              <Icon name="graduation" size={14} />{' '}
              {lang === 'pt' ? 'Graduação' : 'Degree'}
            </div>
            <h3 className="edu__degree">{education.degree[lang]}</h3>
            <div className="edu__school">{education.school[lang]}</div>
            <div className="edu__period">{education.period}</div>
            <p className="edu__desc">{education.description[lang]}</p>
          </div>

          <div className="card reveal">
            <div className="card__title">
              <Icon name="book" size={14} /> {tr('courses', lang)} · {courses.length}
            </div>
            <ul className="courses">
              {courses.map((c) => (
                <li key={c.name}>
                  <span className="courses__year">{c.year}</span>
                  <span className="courses__name">{c.name}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
