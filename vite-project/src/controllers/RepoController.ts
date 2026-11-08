import { RepoModel } from '../models/RepoModel.ts'
import type { Repository } from '../models/RepoModel.ts'
import { RepoView } from '../views/RepoView.ts'

export class RepoController {
  private readonly view: RepoView
  private readonly model: RepoModel
  private repositories: Repository[] = []

  constructor(view: RepoView, model: RepoModel) {
    this.view = view
    this.model = model
  }

  public start(): void {
    this.view.searchBtn.addEventListener('click', async () => {
      const query = this.view.getSearchValue()
      this.repositories = await this.model.searchRepositories(query)
      this.renderRepositories()
    })

    this.view.results.addEventListener('click', (event) => {
      const target = event.target

      if (!(target instanceof HTMLButtonElement)) {
        return
      }

      const item = target.closest<HTMLElement>('[data-repo-id]')
      const repoId = Number(item?.dataset.repoId)
      const repository = this.repositories.find((repo) => repo.id === repoId)

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
  }

  private renderRepositories(): void {
    this.view.renderRepositories(
      this.repositories,
      this.model.getFavorites(),
      this.model.getVisited(),
    )
  }
}
