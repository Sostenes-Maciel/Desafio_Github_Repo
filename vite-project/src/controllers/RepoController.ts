import { RepoModel } from '../models/RepoModel.ts'
import { RepoView } from '../views/RepoView.ts'

export class RepoController {
  private readonly view: RepoView
  private readonly model: RepoModel

  constructor(view: RepoView, model: RepoModel) {
    this.view = view
    this.model = model
  }

  public start(): void {
    this.view.searchBtn.addEventListener('click', async () => {
      const query = this.view.getSearchValue()
      const repositories = await this.model.searchRepositories(query)
      this.view.renderRepositories(repositories)
    })
  }
}
