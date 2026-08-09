import { useEffect, useState } from 'react'
import { github } from '../services/github'
import type { GhRelease, GhRepo, GhUser } from '../services/github'

type State = {
  user: GhUser | null
  repos: GhRepo[]
  stars: number
  loading: boolean
  error: boolean
}

/** Perfil e repositórios públicos do GitHub, prontos para o painel da home. */
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

    github
      .getProfile(username)
      .then(({ user, repos }) => {
        if (!alive) return
        setState({
          user,
          repos: repos.slice(0, 6),
          stars: repos.reduce((sum, r) => sum + r.stargazers_count, 0),
          loading: false,
          error: false,
        })
      })
      .catch(() => {
        if (alive) setState((s) => ({ ...s, loading: false, error: true }))
      })

    return () => {
      alive = false
    }
  }, [username])

  return state
}

/**
 * Última release publicada, usada para mostrar versão e tamanho no botão de
 * download. Falha em silêncio: o botão continua funcionando porque aponta para
 * `/releases/latest/download/...`, que o GitHub resolve sozinho.
 */
export function useLatestRelease(repo: string | undefined): GhRelease | null {
  const [release, setRelease] = useState<GhRelease | null>(null)

  useEffect(() => {
    if (!repo) return
    let alive = true

    github
      .getLatestRelease(repo)
      .then((next) => {
        if (alive) setRelease(next)
      })
      .catch(() => {
        /* sem release ou rate limit — o botão segue com o rótulo padrão */
      })

    return () => {
      alive = false
    }
  }, [repo])

  return release
}
