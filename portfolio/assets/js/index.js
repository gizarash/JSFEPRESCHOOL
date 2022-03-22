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
  'body',
  'skills',
  'portfolio',
  'video',
  'price',
  'mob-menu',
  'section-title',
  'section-title-inner',
  'btn',
  'hamburger'
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

function togglePlayingVideo() {
  if (isPlaying) {
    video.pause();
    isPlaying = false;
    playControl.classList.remove('pause-icon');
    playControl.classList.add('play-icon');
  } else {
    video.play();
    isPlaying = true;
    playControl.classList.remove('play-icon');
    playControl.classList.add('pause-icon');
  }
  playBtn.classList.toggle('hidden');
}

function muteVideo() {
  video.muted = true;
  volumeControl.classList.remove('volume-icon');
  volumeControl.classList.add('mute-icon');
}

function unMuteVideo() {
  video.muted = false;
  volumeControl.classList.remove('mute-icon');
  volumeControl.classList.add('volume-icon');
}

window.addEventListener('load', getLocalStorage)
window.addEventListener('beforeunload', setLocalStorage)

hamburger.addEventListener('click', toggleMenu);
mobMenuList.addEventListener('click', closeMenu);
portfolioBtns.addEventListener('click', changeImage);
portfolioBtns.addEventListener('click', changeImage);
langNode.addEventListener('click', translateHandle);
themeSwitcher.addEventListener('click', toggleTheme);

const video = document.querySelector('.viewer');
const playControl = document.querySelector('.play-control');
const playBtn = document.querySelector('.btn-play');
let isPlaying = false;
const progressBar = document.querySelector(".progress-bar");
const volumeBar = document.querySelector(".volume-bar");
const volumeControl = document.querySelector(".volume-control");

playControl.addEventListener('click', togglePlayingVideo);
playBtn.addEventListener('click', togglePlayingVideo);
video.addEventListener('click', togglePlayingVideo);

progressBar.addEventListener('click', e => {
  const progressBarWidth = window.getComputedStyle(progressBar).width;
  const currentTime = e.offsetX / parseInt(progressBarWidth) * video.duration;
  video.currentTime = currentTime;
  progressBar.style = `background: linear-gradient(to right, rgb(189, 174, 130) 0%, rgb(189, 174, 130) ${currentTime}%, rgb(200, 200, 200) ${currentTime}%, rgb(200, 200, 200) 100%);`;
}, false);
setInterval(() => {
  const currentTime = video.currentTime / video.duration * 100;
  progressBar.value = currentTime;
  progressBar.style = `background: linear-gradient(to right, rgb(189, 174, 130) 0%, rgb(189, 174, 130) ${currentTime}%, rgb(200, 200, 200) ${currentTime}%, rgb(200, 200, 200) 100%);`;
}, 500);

volumeBar.addEventListener('click', e => {
  const volumeBarWidth = window.getComputedStyle(volumeBar).width;
  const currentVolume = e.offsetX / parseInt(volumeBarWidth);
  volumeBar.style = `background: linear-gradient(to right, rgb(189, 174, 130) 0%, rgb(189, 174, 130) ${currentVolume*100}%, rgb(200, 200, 200) ${currentVolume*100}%, rgb(200, 200, 200) 100%);`;
  if (currentVolume < 0) {
    video.volume = 0;
    muteVideo();
  } else if (currentVolume > 1){
    video.volume = 1;
    unMuteVideo();
  } else {
    video.volume = currentVolume;
    unMuteVideo();
  }
}, false);

volumeControl.addEventListener('click', e => {
  if (video.muted) {
    unMuteVideo();
  } else {
    muteVideo();
  }
}, false);

console.log('Все пункты выполнены полностью!')
