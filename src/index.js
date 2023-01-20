import axios from "axios";
import Notiflix from 'notiflix';
// import {fetchImages} from './fetchImages.js'
// console.log(Notiflix);

// Notiflix.Notify.success('Hooray! We found totalHits images.');
// Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
// Notiflix.Notify.warning('Memento te hominem esse');
// Notiflix.Notify.info('We're sorry, but you've reached the end of search results.');

const form = document.querySelector('#search-form');
const input = document.querySelector('input');
const gallery = document.querySelector('.gallery');
// console.log(gallery)

input.addEventListener('input', onInputSearch);
form.addEventListener('submit', onFormSubmit);

function onInputSearch(evt) {
    const searchQuery = evt.target.value.trim();

//     if (!searchQuery) {
// //     clearFields();
//     return;
//     }
    console.log(searchQuery)
    return searchQuery;
}
 
function onFormSubmit(evt) {
    evt.preventDefault();

    fetchImages().then(data => {
        if (data.hits.length === 0) {
            onFetchError();
        }
        console.log(data.hits);
        createImageslist(data.hits);
    }).catch (error => onFetchError());
}

// export { fetchImages };
async function fetchImages(q) {
const BASE_URL = 'https://pixabay.com/api/';
    const API_KEY = '32979410-6576ce951400b06dd5e7c6a2c';
    const response = await axios.get(`${BASE_URL}?key=${API_KEY}&q=ghjkl&image_type=photo&orientation=horizontal&safesearch=true`);
    console.log(response)
    return response.data;
}
    
// function onInputSearch(evt) {
//   const searchQuery = evt.target.value.trim();
 
//   if (!searchQuery) {
//     clearFields();
//     return;
//   }
//   fetchCountries(searchQuery)
//     .then(data => {
      
//       if (data.length > 10) {
//         clearFields();
//         return Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');

//       } else if (data.length >= 2 && data.length <= 10) {
//         countryInfo.innerHTML = '';
//         createCountryListMarkup(data);
          
//       } else {
//         countryList.innerHTML = '';
//         createCountryInfoMarkup(data);
//       }
//     }
//     )
//     .catch((error) => {
//       clearFields();
//       onFetchError();
//     });
// }

// function createCountryInfoMarkup(country) {
//   const markup = country
//     .map(({ flags: { svg: flag }, name: { official: name }, capital, population, languages }) => 
//       `<div class="title"><img src="${flag}" alt="${name}" width="40"/>
//   <h2>${name}</h2></div>
//   <p><b>Capital: </b>${capital[0]}</p>
//   <p><b>Population: </b>${population}</p>
//   <p><b>Languages: </b>${Object.values(languages).join(', ')}</p>`
// ).join("");
//   countryInfo.innerHTML = markup;

//   setStyles();
// }
function createImageslist(images) {
    console.log(images)
    const markup = images.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) =>
        `<div class="photo-card">
    <img src="${webformatURL}" alt="${tags}" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes ${likes}</b>
    </p>
    <p class="info-item">
      <b>Views ${views}</b>
    </p>
    <p class="info-item">
      <b>Comments ${comments}</b>
    </p>
    <p class="info-item">
      <b>Downloads ${downloads}</b>
    </p>
  </div>
</div>`).join('');
    
    gallery.insertAdjacentHTML('beforeend', markup);
    
}
// function createCountryListMarkup(country) {
//   const markup = country
//     .map(({ flags: { svg: flag }, name: { official: name } }) =>
//       `<li class="title"><img src="${flag}" alt="${name}" width="40"/>
//   <h2>${name}</h2></li>`).join('');
//   countryList.innerHTML = markup;

//   const list = document.querySelectorAll('li');
//   list.forEach(listEl => {
//     listEl.style.listStyle = 'none';
//   });

//   setStyles();
// }

// function clearFields() {
//   countryList.innerHTML = '';
//     countryInfo.innerHTML = '';
// }

function onFetchError() {
     Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
}

// function setStyles() {
//   const title = document.querySelectorAll('.title');
//   title.forEach(listEl => {
//     listEl.style.display = 'flex';
//     listEl.style.gap = '20px';
//     listEl.style.alignItems = 'center';
//   });
//  }