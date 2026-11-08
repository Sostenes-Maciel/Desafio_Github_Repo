import { RepoModel } from '../models/RepoModel.ts'
import type { Repository } from '../models/RepoModel.ts'
import { RepoView } from '../views/RepoView.ts'

export class RepoController {
  private readonly view: RepoView
  private readonly model: RepoModel
  private currentRepos: Repository[] = []

  constructor(view: RepoView, model: RepoModel) {
    this.view = view
    this.model = model
  }

  public start(): void {
    this.view.searchBtn.addEventListener('click', async () => {
      const query = this.view.getSearchValue()
      this.currentRepos = await this.model.searchRepositories(query)
      this.renderRepositories()
    })

    this.view.sortSelect.addEventListener('change', () => {
      this.sortRepositories()
      this.renderRepositories()
    })

    this.view.results.addEventListener('click', (event) => {
      const target = event.target

      if (!(target instanceof HTMLButtonElement)) {
        return
      }

      const item = target.closest<HTMLElement>('[data-repo-id]')
      const repoId = Number(item?.dataset.repoId)
      const repository = this.currentRepos.find((repo) => repo.id === repoId)

      if (!repository) {
        return
      }

      if (target.dataset.action === 'favorite') {
        this.model.toggleFavorite(repository)
      } else if (target.dataset.action === 'visited') {
        this.model.markAsVisited(repository)
      }

      this.renderRepositories()
    })

    this.view.favorites.addEventListener('click', (event) => {
      const target = event.target

      if (!(target instanceof HTMLButtonElement) || target.dataset.action !== 'remove-favorite') {
        return
      }

      const item = target.closest<HTMLElement>('[data-repo-id]')
      const repoId = Number(item?.dataset.repoId)
      const repository = this.model.getFavorites().find((repo) => repo.id === repoId)

      if (repository) {
        this.model.toggleFavorite(repository)
        this.renderRepositories()
      }
    })

    this.renderRepositories()
  }

  private renderRepositories(): void {
    this.sortRepositories()
    const favorites = this.model.getFavorites()
    this.view.renderRepositories(
      this.currentRepos,
      favorites,
      this.model.getVisited(),
    )
    this.view.renderFavorites(favorites)
  }

  private sortRepositories(): void {
    const sortOption = this.view.getSortValue()

    if (sortOption === 'name-asc') {
      this.currentRepos.sort((first, second) => first.name.localeCompare(second.name))
    } else if (sortOption === 'name-desc') {
      this.currentRepos.sort((first, second) => second.name.localeCompare(first.name))
    } else if (sortOption === 'recent') {
      this.currentRepos.sort(
        (first, second) =>
          Date.parse(second.created_at) - Date.parse(first.created_at),
      )
    }
  }
}
