import i18Obj from './translate.js';

const hamburger = document.querySelector('.hamburger');
const mobMenu = document.querySelector('.mob-menu');
const mobMenuList = document.querySelector('.mob-menu-list');
const portfolioBtns = document.querySelector('.season-switch');
const portfolioImages = document.querySelectorAll('.portfolio-image');
const langNode = document.querySelector('.lang');
const i18nNodes = document.querySelectorAll('[data-i18]');
const langLinks = document.querySelectorAll('[data-lang]');
const themeSwitcher = document.querySelector('.theme-switcher');
const themeClasses = [
  'skills',
  'portfolio',
  'video',
  'price',
  'mob-menu',
  'section-title',
  'section-title-inner',
  'btn'
];
let currentTheme = 'dark';
let currentLang = 'en';

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

function translateHandle(event) {
  if("lang" in event.target.dataset) {
    event.preventDefault();
    const lang = event.target.dataset.lang;
    translate(lang);
  }
}

function translate(lang) {
  i18nNodes.forEach((currentElement) => {
    if (currentElement.placeholder) {
      currentElement.placeholder = getTranslate(lang, currentElement.dataset.i18);
      currentElement.textContent = '';
    } else {
      currentElement.textContent = getTranslate(lang, currentElement.dataset.i18);
    }
  });
  langLinks.forEach((link) => {
    link.dataset.lang == lang ?link.classList.add('lang-active') : link.classList.remove('lang-active');
  });
  currentLang = lang;
}

function getTranslate(lang, key) {
  return i18Obj[lang][key];
}

function enableLightTheme() {
  themeClasses.forEach((className) => {
    const elementList = document.querySelectorAll('.' + className);
    elementList.forEach((element) => {
      element.classList.add('light-theme');
      if (element.classList.contains('section-title')) {
        element.classList.add('section-title-light');
      }
    });
  });
}

function enableDarkTheme() {
  themeClasses.forEach((className) => {
    const elementList = document.querySelectorAll('.' + className);
    elementList.forEach((element) => {
      element.classList.remove('light-theme');
      if (element.classList.contains('section-title')) {
        element.classList.remove('section-title-light');
      }
    });
  });
}

function toggleTheme() {
  if (currentTheme == 'dark') {
    enableLightTheme();
    currentTheme = 'light';
  } else {
    enableDarkTheme();
    currentTheme = 'dark';
  }
}

function setLocalStorage() {
  localStorage.setItem('theme', currentTheme);
  localStorage.setItem('lang', currentLang);
}

function getLocalStorage() {
  if(localStorage.getItem('theme')) {
    const theme = localStorage.getItem('theme');
    if (theme == 'light') {
      enableLightTheme();
      currentTheme = 'light';
    } else {
      enableDarkTheme();
      currentTheme = 'dark';
    }
  }
  if(localStorage.getItem('lang')) {
    const lang = localStorage.getItem('lang');
    translate(lang);
  }
}

window.addEventListener('load', getLocalStorage)
window.addEventListener('beforeunload', setLocalStorage)

hamburger.addEventListener('click', toggleMenu);
mobMenuList.addEventListener('click', closeMenu);
portfolioBtns.addEventListener('click', changeImage);
portfolioBtns.addEventListener('click', changeImage);
langNode.addEventListener('click', translateHandle);
themeSwitcher.addEventListener('click', toggleTheme);

console.log('Все пункты выполнены полностью!')
