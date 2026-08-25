import { useEffect, useState } from 'react'

export type GhUser = {
  public_repos: number
  followers: number
  created_at: string
}

export type GhRepo = {
  id: number
  name: string
  description: string | null
  html_url: string
  homepage: string | null
  language: string | null
  topics?: string[]
  stargazers_count: number
  updated_at: string
  fork: boolean
}

type State = {
  user: GhUser | null
  repos: GhRepo[]
  /** Repositórios próprios com pelo menos 1 estrela — viram os cards de "Projetos em destaque". */
  featured: GhRepo[]
  stars: number
  loading: boolean
  error: boolean
}

const CACHE_KEY = 'gh-cache-v1'
const CACHE_TTL = 1000 * 60 * 60 // 1 hora

type Cached = { at: number; user: GhUser; repos: GhRepo[] }

function readCache(): Cached | null {
  try {
    const raw = localStorage.getItem(CACHE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as Cached
    if (Date.now() - parsed.at > CACHE_TTL) return null
    return parsed
  } catch {
    return null
  }
}

/**
 * Busca perfil e repositórios públicos direto da API do GitHub.
 * Guarda o resultado por 1h no localStorage para não gastar o rate limit
 * anônimo (60 req/h por IP) em recargas de página.
 */
export function useGitHub(username: string): State {
  const [state, setState] = useState<State>({
    user: null,
    repos: [],
    featured: [],
    stars: 0,
    loading: true,
    error: false,
  })

  useEffect(() => {
    let alive = true

    const apply = (user: GhUser, repos: GhRepo[]) => {
      const own = repos.filter((r) => !r.fork)
      const featured = own
        .filter((r) => r.stargazers_count > 0)
        .sort(
          (a, b) =>
            b.stargazers_count - a.stargazers_count ||
            new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime(),
        )
      setState({
        user,
        repos: own.slice(0, 6),
        featured,
        stars: own.reduce((sum, r) => sum + r.stargazers_count, 0),
        loading: false,
        error: false,
      })
    }

    const cached = readCache()
    if (cached) {
      apply(cached.user, cached.repos)
      return
    }

    const load = async () => {
      try {
        const [userRes, reposRes] = await Promise.all([
          fetch(`https://api.github.com/users/${username}`),
          fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=updated`),
        ])
        if (!userRes.ok || !reposRes.ok) throw new Error('GitHub API error')

        const user = (await userRes.json()) as GhUser
        const repos = (await reposRes.json()) as GhRepo[]
        if (!alive) return

        try {
          localStorage.setItem(CACHE_KEY, JSON.stringify({ at: Date.now(), user, repos }))
        } catch {
          /* localStorage cheio ou indisponível — segue sem cache */
        }
        apply(user, repos)
      } catch {
        if (alive) setState((s) => ({ ...s, loading: false, error: true }))
      }
    }

    void load()
    return () => {
      alive = false
    }
  }, [username])

  return state
}

export type GhRelease = {
  /** Versão publicada, ex. `v1.0.10`. */
  tag: string
  /** Tamanho do executável já formatado, ex. `70 MB`. */
  size: string | null
  /** URL direta do instalador/executável anexado à release, se houver. */
  downloadUrl: string | null
}

const RELEASE_CACHE_KEY = 'gh-release-cache-v1'

function formatSize(bytes: number): string {
  const mb = bytes / (1024 * 1024)
  return mb >= 1 ? `${Math.round(mb)} MB` : `${Math.max(1, Math.round(bytes / 1024))} KB`
}

/**
 * Lê a última release publicada de `owner/repo` para mostrar versão e tamanho
 * ao lado do botão de download. Falha em silêncio: o botão continua funcionando
 * porque aponta para `/releases/latest/download/...`, que o GitHub resolve sozinho.
 */
export function useLatestRelease(repo: string | undefined): GhRelease | null {
  const [release, setRelease] = useState<GhRelease | null>(null)

  useEffect(() => {
    if (!repo) return
    let alive = true

    const cacheKey = `${RELEASE_CACHE_KEY}:${repo}`
    try {
      const raw = localStorage.getItem(cacheKey)
      if (raw) {
        const parsed = JSON.parse(raw) as { at: number; release: GhRelease }
        if (Date.now() - parsed.at <= CACHE_TTL) {
          setRelease(parsed.release)
          return
        }
      }
    } catch {
      /* cache inválido — segue para a rede */
    }

    const load = async () => {
      try {
        const res = await fetch(`https://api.github.com/repos/${repo}/releases/latest`)
        if (!res.ok) throw new Error('GitHub API error')

        const data = (await res.json()) as {
          tag_name: string
          assets: { name: string; size: number; browser_download_url: string }[]
        }
        const asset = data.assets?.find((a) => /\.(exe|msi|zip|dmg|appimage)$/i.test(a.name))
        const next: GhRelease = {
          tag: data.tag_name,
          size: asset ? formatSize(asset.size) : null,
          downloadUrl: asset?.browser_download_url ?? null,
        }
        if (!alive) return

        try {
          localStorage.setItem(cacheKey, JSON.stringify({ at: Date.now(), release: next }))
        } catch {
          /* localStorage cheio ou indisponível — segue sem cache */
        }
        setRelease(next)
      } catch {
        /* sem release ou rate limit — o botão segue com o rótulo padrão */
      }
    }

    void load()
    return () => {
      alive = false
    }
  }, [repo])

  return release
}

/** Cores oficiais do GitHub Linguist para as linguagens que aparecem no perfil. */
export const langColor: Record<string, string> = {
  'C#': '#178600',
  TypeScript: '#3178c6',
  JavaScript: '#f1e05a',
  Python: '#3572A5',
  Java: '#b07219',
  Dart: '#00B4AB',
  Kotlin: '#A97BFF',
  HTML: '#e34c26',
  CSS: '#563d7c',
  Shell: '#89e051',
  Rust: '#dea584',
  Vue: '#41b883',
  Go: '#00ADD8',
}
