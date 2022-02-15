const apiKey = 'c00e4ee86e2e260f6d3bf6fd16e13999';
const imgUrl = 'https://image.tmdb.org/t/p/w1280/'
const initUrl = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=${apiKey}&page=1`;

const main = document.querySelector('main');
async function getData(url) {
  const res = await fetch(url);
  const data = await res.json();
  if (data.results.length > 0) {
    main.innerHTML = '';
    data.results.forEach(movie => {
      main.append(generateMovieCard(movie));
    });
  } else {
    main.textContent = 'Nothing found';
  }
}
getData(initUrl);

const search = document.querySelector('.search');
search.addEventListener("keydown", function(event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    let searchUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${search.value}&page=1`;
    getData(searchUrl);
  }
});

function generateMovieCard(movieData) {
  const card = document.createElement('div');
  card.classList.add('card');
  const img = document.createElement('img');
  img.classList.add('poster')
  img.src = imgUrl + movieData.poster_path;
  img.alt = movieData.title;
  card.append(img);
  const info = document.createElement('div');
  info.classList.add('info');
  const name = document.createElement('h3');
  name.classList.add('name');
  name.textContent = movieData.title;
  info.append(name);
  const score = document.createElement('div');
  score.classList.add('score');
  score.textContent = movieData.vote_average;
  if (movieData.vote_average >= 8) {
    score.classList.add('green');
  } else if(movieData.vote_average >= 5) {
    score.classList.add('orange');
  } else {
    score.classList.add('red');
  }
  info.append(score);
  card.append(info);
  const description = document.createElement('div');
  description.classList.add('description');
  const descriptionTitle = document.createElement('h3');
  descriptionTitle.textContent = 'Overview';
  description.append(descriptionTitle);
  const descriptionBody = document.createElement('p');
  descriptionBody.textContent = movieData.overview;
  description.append(descriptionBody);
  card.append(description);

  return card;
}