import { Icon } from '../components/Icon'
import { skills } from '../data/profile'
import type { Lang } from '../data/profile'
import { tr } from '../data/ui'

export function Skills({ lang }: { lang: Lang }) {
  return (
    <section className="section" id="stack">
      <div className="wrap">
        <div className="section__head reveal">
          <span className="kicker">{tr('sectionSkillsKicker', lang)}</span>
          <h2 className="section__title">{tr('sectionSkills', lang)}</h2>
          <p className="section__lead">{tr('sectionSkillsLead', lang)}</p>
        </div>

        <div className="skills__grid">
          {skills.map((group) => (
            <article className="skill-card reveal" key={group.title.en}>
              <div className="skill-card__head">
                <span className="skill-card__icon">
                  <Icon name={group.icon} size={18} />
                </span>
                <h3 className="skill-card__title">{group.title[lang]}</h3>
              </div>
              <ul className="tags">
                {group.items.map((item) => (
                  <li className="tag" key={item}>
                    {item}
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
