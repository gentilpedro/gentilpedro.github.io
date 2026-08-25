import { Icon } from '../components/Icon'
import { profile } from '../data/profile'
import type { Lang } from '../data/profile'
import { tr } from '../data/ui'
import { langColor, useGitHub, useLatestRelease, type GhRepo } from '../hooks/useGitHub'

function formatDate(iso: string, lang: Lang) {
  return new Date(iso).toLocaleDateString(lang === 'pt' ? 'pt-BR' : 'en-US', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
}

/** `Ansible_lab` -> `Ansible lab` — deixa o nome do repositório mais legível no card. */
function formatRepoName(name: string) {
  return name.replace(/[-_]+/g, ' ')
}

/** Botão de download, só aparece quando a última release do repo tem um instalador anexado. */
function DownloadButton({ repo, lang }: { repo: string; lang: Lang }) {
  const release = useLatestRelease(repo)
  if (!release?.downloadUrl) return null

  const meta = [release.tag, release.size].filter(Boolean).join(' · ')

  return (
    <a className="btn btn--primary btn--sm" href={release.downloadUrl} target="_blank" rel="noreferrer">
      <Icon name="download" size={15} />
      {tr('downloadApp', lang)}
      <span className="btn__meta">{meta}</span>
    </a>
  )
}

function ProjectCard({ repo, lang }: { repo: GhRepo; lang: Lang }) {
  const tags = (repo.topics?.length ? repo.topics : repo.language ? [repo.language] : []).slice(0, 6)

  return (
    <article className="project reveal">
      <div className="project__head">
        <h3 className="project__name">{formatRepoName(repo.name)}</h3>
        {repo.homepage && (
          <span className="project__live-dot">
            <span className="badge__dot" />
            Live
          </span>
        )}
      </div>

      <p className="project__summary">
        {repo.language && (
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, marginRight: 12 }}>
            <span className="dot" style={{ background: langColor[repo.language] ?? '#8b95a3' }} />
            {repo.language}
          </span>
        )}
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}>
          <Icon name="star" size={13} />
          {repo.stargazers_count}
        </span>
      </p>

      <p className="project__detail">{repo.description ?? tr('noDescription', lang)}</p>

      {tags.length > 0 && (
        <ul className="tags project__tags">
          {tags.map((tag) => (
            <li className="tag" key={tag}>
              {tag}
            </li>
          ))}
        </ul>
      )}

      <div className="project__links">
        {repo.homepage && (
          <a className="btn btn--primary btn--sm" href={repo.homepage} target="_blank" rel="noreferrer">
            <Icon name="external" size={15} />
            {tr('liveDemo', lang)}
          </a>
        )}
        <DownloadButton repo={`${profile.github}/${repo.name}`} lang={lang} />
        <a className="btn btn--ghost btn--sm" href={repo.html_url} target="_blank" rel="noreferrer">
          <Icon name="github" size={15} />
          {tr('sourceCode', lang)}
        </a>
      </div>
    </article>
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
  const { featured, loading, error } = useGitHub(profile.github)

  return (
    <section className="section" id="projetos">
      <div className="wrap">
        <div className="section__head reveal">
          <span className="kicker">{tr('sectionProjectsKicker', lang)}</span>
          <h2 className="section__title">{tr('sectionProjects', lang)}</h2>
          <p className="section__lead">{tr('sectionProjectsLead', lang)}</p>
        </div>

        {loading && (
          <div className="projects__grid">
            {[0, 1, 2].map((i) => (
              <div className="project gh__skeleton" key={i} style={{ minHeight: 220 }} />
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

        {!loading && !error && (
          <div className="projects__grid">
            {featured.map((repo) => (
              <ProjectCard repo={repo} lang={lang} key={repo.id} />
            ))}
          </div>
        )}

        <GitHubPanel lang={lang} />
      </div>
    </section>
  )
}
