/**
 * Gallery filter logic — shared across all 5 theme Gallery components.
 * Handles filter button clicks and item visibility toggling.
 * Compatible with View Transitions (call on astro:page-load).
 */
export function initGalleryFilter(): void {
  const buttons = document.querySelectorAll<HTMLButtonElement>('[data-filter]')
  const items = document.querySelectorAll<HTMLElement>('[data-gallery-item]')

  if (buttons.length === 0 || items.length === 0) return

  buttons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.filter

      buttons.forEach((b) => {
        const isActive = b === btn
        b.classList.toggle('filter--active', isActive)
        b.setAttribute('aria-pressed', String(isActive))
      })

      items.forEach((item) => {
        const matches = filter === 'all' || item.dataset.service === filter
        item.style.display = matches ? '' : 'none'
      })
    })
  })
}
