export interface Repository {
  id: number
  name: string
  html_url: string
  created_at: string
}

interface SearchRepositoriesResponse {
  items: Repository[]
}

export class RepoModel {
  private readonly favoritesKey = 'github-repositories-favorites'
  private readonly visitedKey = 'github-repositories-visited'

  public async searchRepositories(query: string): Promise<Repository[]> {
    const response = await fetch(
      `https://api.github.com/search/repositories?q=${encodeURIComponent(query)}`,
    )

    if (!response.ok) {
      throw new Error(`GitHub API request failed: ${response.status}`)
    }

    const data = (await response.json()) as SearchRepositoriesResponse
    return data.items
  }

  public toggleFavorite(repo: Repository): void {
    const favorites = this.getFavorites()
    const favoriteIndex = favorites.findIndex((favorite) => favorite.id === repo.id)

    if (favoriteIndex === -1) {
      favorites.push(repo)
    } else {
      favorites.splice(favoriteIndex, 1)
    }

    this.saveRepositories(this.favoritesKey, favorites)
  }

  public getFavorites(): Repository[] {
    return this.loadRepositories(this.favoritesKey)
  }

  public markAsVisited(repo: Repository): void {
    const visited = this.getVisited()

    if (!visited.some((item) => item.id === repo.id)) {
      visited.push(repo)
      this.saveRepositories(this.visitedKey, visited)
    }
  }

  public getVisited(): Repository[] {
    return this.loadRepositories(this.visitedKey)
  }

  private loadRepositories(key: string): Repository[] {
    const storedRepositories = localStorage.getItem(key)

    if (!storedRepositories) {
      return []
    }

    return JSON.parse(storedRepositories) as Repository[]
  }

  private saveRepositories(key: string, repositories: Repository[]): void {
    localStorage.setItem(key, JSON.stringify(repositories))
  }
}
