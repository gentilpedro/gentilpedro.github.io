import { Download, ExternalLink, Lock, Star } from 'lucide-react'
import { BrandIcon } from '../components/BrandIcon'
import {
  Button,
  ButtonMeta,
  CardTitle,
  PulseDot,
  Section,
  SectionHead,
  Tag,
  TagList,
} from '../components/ui'
import { profile, projects } from '../data/profile'
import type { Lang, Project } from '../data/profile'
import { tr } from '../data/ui'
import { useGitHub, useLatestRelease } from '../hooks/useGitHub'
import { langColor } from '../services/github'

function formatDate(iso: string, lang: Lang) {
  return new Date(iso).toLocaleDateString(lang === 'pt' ? 'pt-BR' : 'en-US', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
}

/** Botão de download do executável, com versão e tamanho da última release. */
function DownloadButton({ project, lang }: { project: Project; lang: Lang }) {
  const release = useLatestRelease(project.releaseRepo)
  const meta = release
    ? [release.tag, release.size].filter(Boolean).join(' · ')
    : tr('downloadAppWindows', lang)

  return (
    <Button size="sm" href={project.download} target="_blank" rel="noreferrer">
      <Download size={15} />
      {tr('downloadApp', lang)}
      <ButtonMeta>{meta}</ButtonMeta>
    </Button>
  )
}

function GitHubPanel({ lang }: { lang: Lang }) {
  const { user, repos, stars, loading, error } = useGitHub(profile.github)

  const cards = user
    ? [
        { value: user.public_repos, label: tr('ghRepos', lang) },
        { value: stars, label: tr('ghStars', lang) },
        { value: user.followers, label: tr('ghFollowers', lang) },
        { value: new Date(user.created_at).getFullYear(), label: tr('ghSince', lang) },
      ]
    : []

  return (
    <div className="reveal mt-16 rounded-panel border border-line bg-subtle p-8 max-[760px]:p-[22px] print:hidden">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3.5">
        <div>
          <h3 className="flex items-center gap-[11px] text-[1.15rem]">
            <BrandIcon name="github" size={22} />
            {tr('ghActivity', lang)}
          </h3>
          <p className="mt-1 text-[0.88rem] font-normal text-faint">{tr('ghActivityLead', lang)}</p>
        </div>
        <Button
          variant="ghost"
          size="sm"
          href={profile.githubUrl}
          target="_blank"
          rel="noreferrer"
        >
          @{profile.github}
          <ExternalLink size={15} />
        </Button>
      </div>

      {loading && (
        <div className="grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-3.5">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-[108px] animate-shimmer rounded-card bg-[linear-gradient(90deg,var(--color-inset)_25%,var(--color-elevated)_50%,var(--color-inset)_75%)] bg-[length:200%_100%]"
            />
          ))}
        </div>
      )}

      {error && !loading && (
        <p className="text-[0.92rem] text-muted">
          {tr('ghError', lang)}{' '}
          <a
            href={profile.githubUrl}
            target="_blank"
            rel="noreferrer"
            className="text-accent hover:text-accent-hover"
          >
            {tr('ghProfile', lang)}
          </a>
        </p>
      )}

      {user && !loading && (
        <>
          <div className="mb-[26px] grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-3.5">
            {cards.map((c) => (
              <div key={c.label} className="rounded-card border border-line bg-elevated p-[18px]">
                <div className="text-[1.7rem] leading-[1.1] font-extrabold tracking-[-0.03em]">
                  {c.value}
                </div>
                <div className="mt-[3px] text-[0.82rem] text-muted">{c.label}</div>
              </div>
            ))}
          </div>

          <CardTitle className="mb-3">{tr('ghLatest', lang)}</CardTitle>

          <div className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-3">
            {repos.map((repo) => (
              <a
                key={repo.id}
                href={repo.html_url}
                target="_blank"
                rel="noreferrer"
                className="block rounded-card border border-line bg-elevated p-4 text-fg transition duration-200 hover:-translate-y-0.5 hover:border-accent"
              >
                <div className="mb-[5px] flex items-center gap-[7px] text-[0.95rem] font-semibold [overflow-wrap:anywhere]">
                  {repo.name}
                </div>
                <div className="line-clamp-2 min-h-[2.4em] text-[0.84rem] text-muted">
                  {repo.description ?? '—'}
                </div>
                <div className="mt-[11px] flex items-center gap-3.5 text-[0.78rem] text-faint">
                  {repo.language && (
                    <span className="inline-flex items-center gap-1.5">
                      <span
                        className="h-[9px] w-[9px] shrink-0 rounded-full"
                        style={{ background: langColor[repo.language] ?? '#8b95a3' }}
                      />
                      {repo.language}
                    </span>
                  )}
                  {repo.stargazers_count > 0 && (
                    <span className="inline-flex items-center gap-[5px]">
                      <Star size={13} />
                      {repo.stargazers_count}
                    </span>
                  )}
                  <span>
                    {tr('updated', lang)} {formatDate(repo.updated_at, lang)}
                  </span>
                </div>
              </a>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export function Projects({ lang }: { lang: Lang }) {
  return (
    <Section id="projetos">
      <SectionHead
        kicker={tr('sectionProjectsKicker', lang)}
        title={tr('sectionProjects', lang)}
        lead={tr('sectionProjectsLead', lang)}
      />

      <div className="grid grid-cols-[repeat(auto-fill,minmax(340px,1fr))] gap-5">
        {projects
          .filter((p) => p.featured)
          .map((p) => (
            <article
              key={p.name}
              className="reveal flex flex-col rounded-panel border border-line bg-elevated p-[26px] transition duration-200 hover:-translate-y-[3px] hover:border-accent hover:shadow-md"
            >
              <div className="mb-1 flex items-start justify-between gap-3">
                <h3 className="text-[1.2rem] tracking-[-0.025em]">{p.name}</h3>
                {p.live && (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-success-soft px-[9px] py-[3px] text-[0.74rem] font-semibold whitespace-nowrap text-success">
                    <PulseDot />
                    Live
                  </span>
                )}
              </div>

              <p className="mb-3 text-[0.9rem] font-semibold text-accent">{p.summary[lang]}</p>
              <p className="mb-[18px] grow text-[0.94rem] text-muted">{p.detail[lang]}</p>

              <TagList className="mb-[18px]">
                {p.tags.map((tag) => (
                  <Tag key={tag}>{tag}</Tag>
                ))}
              </TagList>

              <div className="flex flex-wrap gap-[9px] border-t border-line pt-4">
                {p.live && (
                  <Button size="sm" href={p.live} target="_blank" rel="noreferrer">
                    <ExternalLink size={15} />
                    {tr('liveDemo', lang)}
                  </Button>
                )}
                {p.download && <DownloadButton project={p} lang={lang} />}
                {p.repo ? (
                  <Button variant="ghost" size="sm" href={p.repo} target="_blank" rel="noreferrer">
                    <BrandIcon name="github" size={15} />
                    {tr('sourceCode', lang)}
                  </Button>
                ) : (
                  <span className="inline-flex items-center gap-[7px] py-2 text-[0.82rem] text-faint">
                    <Lock size={14} />
                    {tr('privateRepo', lang)}
                  </span>
                )}
              </div>
            </article>
          ))}
      </div>

      <GitHubPanel lang={lang} />
    </Section>
  )
}
