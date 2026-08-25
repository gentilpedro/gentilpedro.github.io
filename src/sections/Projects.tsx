import { Icon } from '../components/Icon'
import { profile, projects } from '../data/profile'
import type { Lang, Project } from '../data/profile'
import { tr } from '../data/ui'
import { langColor, useGitHub, useLatestRelease } from '../hooks/useGitHub'

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
    <a
      className="btn btn--primary btn--sm"
      href={project.download}
      target="_blank"
      rel="noreferrer"
    >
      <Icon name="download" size={15} />
      {tr('downloadApp', lang)}
      <span className="btn__meta">{meta}</span>
    </a>
  )
}

function GitHubPanel({ lang }: { lang: Lang }) {
  const { user, repos, stars, loading, error } = useGitHub(profile.github)

  return (
    <div className="gh reveal">
      <div className="gh__head">
        <div>
          <h3 className="gh__title">
            <Icon name="github" size={22} />
            {tr('ghActivity', lang)}
          </h3>
          <p className="gh__lead">{tr('ghActivityLead', lang)}</p>
        </div>
        <a
          className="btn btn--ghost btn--sm"
          href={profile.githubUrl}
          target="_blank"
          rel="noreferrer"
        >
          @{profile.github}
          <Icon name="external" size={15} />
        </a>
      </div>

      {loading && (
        <div className="gh__stats">
          {[0, 1, 2, 3].map((i) => (
            <div className="gh__skeleton" key={i} />
          ))}
        </div>
      )}

      {error && !loading && (
        <p className="gh__error">
          {tr('ghError', lang)}{' '}
          <a href={profile.githubUrl} target="_blank" rel="noreferrer">
            {tr('ghProfile', lang)}
          </a>
        </p>
      )}

      {user && !loading && (
        <>
          <div className="gh__stats">
            <div className="gh__stat">
              <div className="gh__stat-value">{user.public_repos}</div>
              <div className="gh__stat-label">{tr('ghRepos', lang)}</div>
            </div>
            <div className="gh__stat">
              <div className="gh__stat-value">{stars}</div>
              <div className="gh__stat-label">{tr('ghStars', lang)}</div>
            </div>
            <div className="gh__stat">
              <div className="gh__stat-value">{user.followers}</div>
              <div className="gh__stat-label">{tr('ghFollowers', lang)}</div>
            </div>
            <div className="gh__stat">
              <div className="gh__stat-value">{new Date(user.created_at).getFullYear()}</div>
              <div className="gh__stat-label">{tr('ghSince', lang)}</div>
            </div>
          </div>

          <div className="card__title" style={{ marginBottom: 12 }}>
            {tr('ghLatest', lang)}
          </div>
          <div className="gh__repos">
            {repos.map((repo) => (
              <a
                className="gh__repo"
                key={repo.id}
                href={repo.html_url}
                target="_blank"
                rel="noreferrer"
              >
                <div className="gh__repo-name">{repo.name}</div>
                <div className="gh__repo-desc">{repo.description ?? '—'}</div>
                <div className="gh__repo-foot">
                  {repo.language && (
                    <span
                      style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}
                    >
                      <span
                        className="dot"
                        style={{ background: langColor[repo.language] ?? '#8b95a3' }}
                      />
                      {repo.language}
                    </span>
                  )}
                  {repo.stargazers_count > 0 && (
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}>
                      <Icon name="star" size={13} />
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
    <section className="section" id="projetos">
      <div className="wrap">
        <div className="section__head reveal">
          <span className="kicker">{tr('sectionProjectsKicker', lang)}</span>
          <h2 className="section__title">{tr('sectionProjects', lang)}</h2>
          <p className="section__lead">{tr('sectionProjectsLead', lang)}</p>
        </div>

        <div className="projects__grid">
          {projects
            .filter((p) => p.featured)
            .map((p) => (
              <article className="project reveal" key={p.name}>
                <div className="project__head">
                  <h3 className="project__name">{p.name}</h3>
                  {p.live && (
                    <span className="project__live-dot">
                      <span className="badge__dot" />
                      Live
                    </span>
                  )}
                </div>
                <p className="project__summary">{p.summary[lang]}</p>
                <p className="project__detail">{p.detail[lang]}</p>

                <ul className="tags project__tags">
                  {p.tags.map((tag) => (
                    <li className="tag" key={tag}>
                      {tag}
                    </li>
                  ))}
                </ul>

                <div className="project__links">
                  {p.live && (
                    <a
                      className="btn btn--primary btn--sm"
                      href={p.live}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <Icon name="external" size={15} />
                      {tr('liveDemo', lang)}
                    </a>
                  )}
                  {p.download && <DownloadButton project={p} lang={lang} />}
                  {p.repo && (
                    <a
                      className="btn btn--ghost btn--sm"
                      href={p.repo}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <Icon name="github" size={15} />
                      {tr('sourceCode', lang)}
                    </a>
                  )}
                  {!p.repo && (
                    <span className="project__private">
                      <Icon name="lock" size={14} />
                      {tr('privateRepo', lang)}
                    </span>
                  )}
                </div>
              </article>
            ))}
        </div>

        <GitHubPanel lang={lang} />
      </div>
    </section>
  )
}
