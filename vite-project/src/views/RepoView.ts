import type { Repository } from '../models/RepoModel.ts'

export class RepoView {
  public readonly searchInput: HTMLInputElement
  public readonly searchBtn: HTMLButtonElement
  public readonly sortSelect: HTMLSelectElement
  public readonly results: HTMLDivElement

  constructor() {
    this.searchInput = document.querySelector<HTMLInputElement>('#searchInput')!
    this.searchBtn = document.querySelector<HTMLButtonElement>('#searchBtn')!
    this.sortSelect = document.querySelector<HTMLSelectElement>('#sortSelect')!
    this.results = document.querySelector<HTMLDivElement>('#results')!
  }

  public getSearchValue(): string {
    return this.searchInput.value
  }

  public getSortValue(): string {
    return this.sortSelect.value
  }

  public renderRepositories(
    repos: Repository[],
    favorites: Repository[],
    visited: Repository[],
  ): void {
    this.results.innerHTML = `
      <ul>
        ${repos
          .map((repo) => {
            const isFavorite = favorites.some((favorite) => favorite.id === repo.id)
            const isVisited = visited.some((item) => item.id === repo.id)

            return `
              <li${isVisited ? ' style="background-color: #e8e8e8"' : ''} data-repo-id="${repo.id}">
                <a href="${repo.html_url}" target="_blank" rel="noopener noreferrer">${repo.name}</a>
                <button type="button" data-action="favorite">${isFavorite ? 'Remover dos Favoritos' : 'Favoritar'}</button>
                <button type="button" data-action="visited"${isVisited ? ' disabled' : ''}>${isVisited ? 'Visualizado' : 'Marcar como Visualizado'}</button>
              </li>
            `
          })
          .join('')}
      </ul>
    `
  }
}
