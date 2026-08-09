import { BookOpen, GraduationCap } from 'lucide-react'
import { Card, CardTitle, Section, SectionHead } from '../components/ui'
import { courses, education } from '../data/profile'
import type { Lang } from '../data/profile'
import { tr } from '../data/ui'

export function Education({ lang }: { lang: Lang }) {
  return (
    <Section id="formacao">
      <SectionHead
        kicker={tr('sectionEducationKicker', lang)}
        title={tr('sectionEducation', lang)}
      />

      <div className="grid grid-cols-2 items-start gap-6 max-[900px]:grid-cols-1 max-[900px]:gap-8">
        <Card className="reveal">
          <CardTitle>
            <GraduationCap size={14} />
            {lang === 'pt' ? 'Graduação' : 'Degree'}
          </CardTitle>
          <h3 className="mb-[5px] text-[1.2rem]">{education.degree[lang]}</h3>
          <div className="text-[0.95rem] font-semibold text-accent">{education.school[lang]}</div>
          <div className="my-3 inline-block rounded-[7px] bg-inset px-2.5 py-[3px] font-mono text-[0.84rem] text-muted">
            {education.period}
          </div>
          <p className="text-[0.95rem] text-muted">{education.description[lang]}</p>
        </Card>

        <Card className="reveal">
          <CardTitle>
            <BookOpen size={14} />
            {tr('courses', lang)} · {courses.length}
          </CardTitle>
          <ul>
            {courses.map((c) => (
              <li
                key={c.name}
                className="flex items-baseline gap-3 border-b border-dashed border-line py-[9px] text-[0.91rem] last:border-b-0"
              >
                <span className="shrink-0 rounded-[5px] bg-accent-soft px-[7px] py-px font-mono text-[0.76rem] text-accent">
                  {c.year}
                </span>
                <span className="text-muted">{c.name}</span>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </Section>
  )
}
