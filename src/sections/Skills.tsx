import {
  ChartLine,
  CircleCheck,
  Database,
  LayoutDashboard,
  Server,
  Settings,
  Smartphone,
  Sparkles,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { Section, SectionHead, Tag, TagList } from '../components/ui'
import { skills } from '../data/profile'
import type { Lang } from '../data/profile'
import { tr } from '../data/ui'

/** Liga o `icon` dos dados (agnóstico de UI) ao componente do lucide. */
const ICONS: Record<string, LucideIcon> = {
  server: Server,
  layout: LayoutDashboard,
  database: Database,
  cog: Settings,
  chart: ChartLine,
  phone: Smartphone,
  sparkles: Sparkles,
  check: CircleCheck,
}

export function Skills({ lang }: { lang: Lang }) {
  return (
    <Section id="stack">
      <SectionHead
        kicker={tr('sectionSkillsKicker', lang)}
        title={tr('sectionSkills', lang)}
        lead={tr('sectionSkillsLead', lang)}
      />

      <div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-[18px]">
        {skills.map((group) => {
          const GroupIcon = ICONS[group.icon] ?? Sparkles

          return (
            <article
              key={group.title.en}
              className="group reveal rounded-card border border-line bg-elevated p-[22px] transition duration-200 hover:-translate-y-0.5 hover:border-accent hover:shadow-md"
            >
              <div className="mb-4 flex items-center gap-[11px]">
                <span className="grid h-[34px] w-[34px] shrink-0 place-items-center rounded-[9px] bg-accent-soft text-accent">
                  <GroupIcon size={18} />
                </span>
                <h3 className="text-base font-semibold">{group.title[lang]}</h3>
              </div>

              <TagList>
                {group.items.map((item) => (
                  <Tag key={item}>{item}</Tag>
                ))}
              </TagList>
            </article>
          )
        })}
      </div>
    </Section>
  )
}
