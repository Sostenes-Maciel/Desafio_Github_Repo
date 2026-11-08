export class RepoView {
  public readonly searchInput: HTMLInputElement
  public readonly searchBtn: HTMLButtonElement
  public readonly results: HTMLDivElement

  constructor() {
    this.searchInput = document.querySelector<HTMLInputElement>('#searchInput')!
    this.searchBtn = document.querySelector<HTMLButtonElement>('#searchBtn')!
    this.results = document.querySelector<HTMLDivElement>('#results')!
  }

  public getSearchValue(): string {
    return this.searchInput.value
  }
}
