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
  language: string | null
  stargazers_count: number
  updated_at: string
  fork: boolean
}

type State = {
  user: GhUser | null
  repos: GhRepo[]
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
    stars: 0,
    loading: true,
    error: false,
  })

  useEffect(() => {
    let alive = true

    const apply = (user: GhUser, repos: GhRepo[]) => {
      const own = repos.filter((r) => !r.fork)
      setState({
        user,
        repos: own.slice(0, 6),
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
