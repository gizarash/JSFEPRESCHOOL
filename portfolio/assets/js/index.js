const hamburger = document.querySelector('.hamburger');
const mobMenu = document.querySelector('.mob-menu');
const mobMenuList = document.querySelector('.mob-menu-list');

function toggleMenu() {
  hamburger.classList.toggle('is-active');
  mobMenu.classList.toggle('is-active');
}

function closeMenu(event) {
  if (event.target.classList.contains('mob-menu-link')) {
    hamburger.classList.remove('is-active');
    mobMenu.classList.remove('is-active');
  }
}

hamburger.addEventListener('click', toggleMenu);
mobMenuList.addEventListener('click', closeMenu);

console.log('Все пункты выполнены полностью!')
