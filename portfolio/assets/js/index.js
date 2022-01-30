const hamburger = document.querySelector('.hamburger');
const mobMenu = document.querySelector('.mob-menu');
const mobMenuList = document.querySelector('.mob-menu-list');
const portfolioBtns = document.querySelector('.season-switch');
const portfolioImages = document.querySelectorAll('.portfolio-image');

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

function changeImage(event) {
  if(event.target.classList.contains('btn')) {
    const season = event.target.dataset.season;
    preloadSeasonImages(season);
    portfolioImages.forEach((img, index) => img.src = `./assets/img/${season}/${index + 1}.jpg`);
    document.querySelectorAll('.portfolio-btn').forEach((btn) => btn.classList.remove('active'));
    event.target.classList.add('active');
  }
}

function preloadSeasonImages(season) {
  for(let i = 1; i <= 6; i++) {
    const img = new Image();
    img.src = `./assets/img/${season}/${i}.jpg`;
  }
}

hamburger.addEventListener('click', toggleMenu);
mobMenuList.addEventListener('click', closeMenu);
portfolioBtns.addEventListener('click', changeImage);


console.log('Все пункты выполнены полностью!')
