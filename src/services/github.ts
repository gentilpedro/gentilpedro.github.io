const API_BASE_URL = import.meta.env.VITE_GITHUB_API_URL || 'https://api.github.com'

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

export type GhProfile = {
  user: GhUser
  repos: GhRepo[]
}

export type GhRelease = {
  /** Versão publicada, ex. `v1.0.10`. */
  tag: string
  /** Tamanho do executável já formatado, ex. `70 MB`. */
  size: string | null
}

const CACHE_TTL = 1000 * 60 * 60 // 1 hora

type Cached<T> = { at: number; data: T }

/** Lê do localStorage se ainda estiver dentro da validade. */
function readCache<T>(key: string): T | null {
  try {
    const raw = localStorage.getItem(key)
    if (!raw) return null
    const parsed = JSON.parse(raw) as Cached<T>
    if (Date.now() - parsed.at > CACHE_TTL) return null
    return parsed.data
  } catch {
    return null
  }
}

function writeCache<T>(key: string, data: T) {
  try {
    localStorage.setItem(key, JSON.stringify({ at: Date.now(), data } satisfies Cached<T>))
  } catch {
    /* localStorage cheio ou indisponível — segue sem cache */
  }
}

function formatSize(bytes: number): string {
  const mb = bytes / (1024 * 1024)
  return mb >= 1 ? `${Math.round(mb)} MB` : `${Math.max(1, Math.round(bytes / 1024))} KB`
}

/**
 * Client da API pública do GitHub. Os resultados ficam 1h no localStorage
 * para não gastar o rate limit anônimo (60 req/h por IP) em recargas de página.
 */
class GitHubService {
  private baseURL: string

  constructor(baseURL: string = API_BASE_URL) {
    this.baseURL = baseURL
  }

  private async get<T>(endpoint: string): Promise<T> {
    const response = await fetch(`${this.baseURL}${endpoint}`)
    if (!response.ok) throw new Error(`GitHub API error: ${response.status}`)
    return (await response.json()) as T
  }

  /** Perfil + repositórios próprios (forks excluídos), ordenados por atualização. */
  async getProfile(username: string): Promise<GhProfile> {
    const cacheKey = `gh-cache-v2:${username}`
    const cached = readCache<GhProfile>(cacheKey)
    if (cached) return cached

    const [user, allRepos] = await Promise.all([
      this.get<GhUser>(`/users/${username}`),
      this.get<GhRepo[]>(`/users/${username}/repos?per_page=100&sort=updated`),
    ])

    const profile: GhProfile = { user, repos: allRepos.filter((r) => !r.fork) }
    writeCache(cacheKey, profile)
    return profile
  }

  /** Última release de `owner/repo`, para exibir versão e tamanho no download. */
  async getLatestRelease(repo: string): Promise<GhRelease> {
    const cacheKey = `gh-release-cache-v2:${repo}`
    const cached = readCache<GhRelease>(cacheKey)
    if (cached) return cached

    const data = await this.get<{ tag_name: string; assets: { name: string; size: number }[] }>(
      `/repos/${repo}/releases/latest`,
    )
    const asset = data.assets?.find((a) => /\.(exe|msi|zip|dmg|appimage)$/i.test(a.name))
    const release: GhRelease = { tag: data.tag_name, size: asset ? formatSize(asset.size) : null }

    writeCache(cacheKey, release)
    return release
  }
}

export const github = new GitHubService()

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
