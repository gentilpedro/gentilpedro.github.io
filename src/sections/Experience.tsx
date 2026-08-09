import { Section, SectionHead, Tag, TagList } from '../components/ui'
import { experience } from '../data/profile'
import type { Lang } from '../data/profile'
import { tr } from '../data/ui'

export function Experience({ lang }: { lang: Lang }) {
  return (
    <Section id="experiencia">
      <SectionHead
        kicker={tr('sectionExperienceKicker', lang)}
        title={tr('sectionExperience', lang)}
      />

      {/* A linha vertical da timeline é o ::before do container. */}
      <div className="relative pl-[30px] before:absolute before:top-2 before:bottom-2 before:left-1.5 before:w-0.5 before:bg-line before:content-['']">
        {experience.map((job) => (
          <article
            key={job.company + job.period.en}
            className={`reveal relative pb-11 last:pb-0 before:absolute before:top-[7px] before:-left-[30px] before:h-3.5 before:w-3.5 before:rounded-full before:border-[2.5px] before:content-[''] ${
              job.current
                ? 'before:border-accent before:bg-accent before:shadow-[0_0_0_4px_var(--color-accent-soft)]'
                : 'before:border-line-strong before:bg-bg'
            }`}
          >
            <div className="mb-[3px] flex flex-wrap items-baseline gap-2.5">
              <h3 className="text-[1.15rem]">{job.role[lang]}</h3>
              {job.current && (
                <span className="rounded-full bg-accent-soft px-[9px] py-[3px] text-[0.72rem] font-bold tracking-[0.06em] text-accent uppercase">
                  {tr('current', lang)}
                </span>
              )}
            </div>

            <div className="mb-4 flex flex-wrap items-center gap-2.5 text-[0.9rem] text-muted">
              <span className="font-semibold text-fg">{job.company}</span>
              <span aria-hidden="true">·</span>
              <span>{job.period[lang]}</span>
              <span aria-hidden="true">·</span>
              <span>Pelotas, RS</span>
            </div>

            <ul className="[&_strong]:font-semibold [&_strong]:text-fg">
              {job.bullets.map((b, i) => (
                <li
                  key={i}
                  className="relative mb-2.5 pl-5 text-[0.96rem] text-muted before:absolute before:top-2.5 before:left-0.5 before:h-[5px] before:w-[5px] before:rounded-full before:bg-accent before:content-['']"
                  dangerouslySetInnerHTML={{ __html: b[lang] }}
                />
              ))}
            </ul>

            <TagList className="mt-4">
              {job.stack.map((s) => (
                <Tag key={s}>{s}</Tag>
              ))}
            </TagList>
          </article>
        ))}
      </div>
    </Section>
  )
}
