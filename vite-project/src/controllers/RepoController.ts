import { RepoView } from '../views/RepoView.ts'

export class RepoController {
  private readonly view: RepoView

  constructor(view: RepoView) {
    this.view = view
  }

  public start(): void {
    this.view.searchBtn.addEventListener('click', () => {
      console.log(this.view.getSearchValue())
    })
  }
}
