export interface Repository {
  id: number
  name: string
  html_url: string
}

interface SearchRepositoriesResponse {
  items: Repository[]
}

export class RepoModel {
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
}
