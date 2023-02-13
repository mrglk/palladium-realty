import { Body } from './classes/Body';
import { isWindowSizeSmallerThen } from './utils/helpers';

export function initBurgerMenu() {
  const burgerMenuButton = document.querySelector('.js-burger-menu-button');
  const burgerMenu = document.querySelector('.js-burger-menu');
  const langButton = document.querySelector('.js-lang-button');

  const overlay = document.querySelector('.js-overlay')

  if (!burgerMenuButton || !burgerMenu) {
    return
  }

  burgerMenuButton.addEventListener('click', function(e) {
    e.preventDefault()

    burgerMenu.classList.toggle('burgerMenu--active')
    burgerMenuButton.classList.toggle('header__menuButton--active')
    langButton.classList.toggle('header__langButtonWrapper--openedMenu')

    Body.toggleBody()
    Body.toggleOverlay()
  })

  burgerMenu.addEventListener('click', function(e) {
    if (!e.target.closest('a')) {
      return
    }

    burgerMenu.classList.remove('burgerMenu--active')
    burgerMenuButton.classList.remove('header__menuButton--active')
    langButton.classList.remove('header__langButtonWrapper--openedMenu')

    Body.releaseBody()
    Body.releaseOverlay()
  })

  overlay.addEventListener('click', function() {
    if (!burgerMenu.classList.contains('burgerMenu--active')) {
      return
    }

    burgerMenu.classList.remove('burgerMenu--active')
    burgerMenuButton.classList.remove('header__menuButton--active')
    langButton.classList.remove('header__langButtonWrapper--openedMenu')

    Body.releaseBody()
    Body.releaseOverlay()
  })
}