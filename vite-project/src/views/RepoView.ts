import type { Repository } from '../models/RepoModel.ts'

export class RepoView {
  public readonly searchInput: HTMLInputElement
  public readonly searchBtn: HTMLButtonElement
  public readonly sortSelect: HTMLSelectElement
  public readonly favorites: HTMLDivElement
  public readonly results: HTMLDivElement

  constructor() {
    this.searchInput = document.querySelector<HTMLInputElement>('#searchInput')!
    this.searchBtn = document.querySelector<HTMLButtonElement>('#searchBtn')!
    this.sortSelect = document.querySelector<HTMLSelectElement>('#sortSelect')!
    this.favorites = document.querySelector<HTMLDivElement>('#favorites')!
    this.results = document.querySelector<HTMLDivElement>('#results')!
  }

  public getSearchValue(): string {
    return this.searchInput.value
  }

  public getSortValue(): string {
    return this.sortSelect.value
  }

  public renderFavorites(favorites: Repository[]): void {
    if (favorites.length === 0) {
      this.favorites.innerHTML = '<p class="empty-state">Você ainda não adicionou favoritos.</p>'
      return
    }

    this.favorites.innerHTML = `
      <ul class="favorites-list">
        ${favorites
          .map(
            (repo) => `
              <li class="favorite-item" data-repo-id="${repo.id}">
                <a class="repo-name" href="${repo.html_url}" target="_blank" rel="noopener noreferrer">${repo.name}</a>
                <button class="remove-favorite-btn" type="button" data-action="remove-favorite">Remover</button>
              </li>
            `,
          )
          .join('')}
      </ul>
    `
  }

  public renderRepositories(
    repos: Repository[],
    favorites: Repository[],
    visited: Repository[],
  ): void {
    this.results.innerHTML = `
      <ul class="repo-grid">
        ${repos
          .map((repo) => {
            const isFavorite = favorites.some((favorite) => favorite.id === repo.id)
            const isVisited = visited.some((item) => item.id === repo.id)

            return `
              <li class="repo-card${isVisited ? ' is-visited' : ''}" data-repo-id="${repo.id}">
                <a class="repo-name" href="${repo.html_url}" target="_blank" rel="noopener noreferrer">${repo.name}</a>
                <div class="repo-actions">
                  <button class="favorite-btn" type="button" data-action="favorite">${isFavorite ? 'Remover dos Favoritos' : 'Favoritar'}</button>
                  <button class="visited-btn" type="button" data-action="visited"${isVisited ? ' disabled' : ''}>${isVisited ? 'Visualizado' : 'Marcar como Visualizado'}</button>
                </div>
              </li>
            `
          })
          .join('')}
      </ul>
    `
  }
}
