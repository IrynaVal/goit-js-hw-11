import Notiflix from 'notiflix';
import {fetchImages} from './fetchImages.js'
// console.log(Notiflix);

// Notiflix.Notify.success('Hooray! We found totalHits images.');
// Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
// Notiflix.Notify.warning('Memento te hominem esse');
// Notiflix.Notify.info('We're sorry, but you've reached the end of search results.');

const form = document.querySelector('#search-form');
const gallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');
let searchQuery = '';
let page = 1;
let imgPerPage = 40;

form.addEventListener('submit', onFormSubmit);
loadMoreBtn.addEventListener('click', onLoadMore);

function onFormSubmit(evt) {
  evt.preventDefault();
  
  searchQuery = evt.currentTarget.elements.searchQuery.value.trim();

  // if (!searchQuery) {
  //   clearMarkup();
  //   return;
  //   }

    fetchImages(searchQuery, page, imgPerPage).then(data => {
        if (data.hits.length === 0) {
          onFetchError();
          return;
      }
            
      Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`);
      
      if (data.totalHits <= imgPerPage) {
        loadMoreBtn.hidden = true;
        Notiflix.Notify.info('We`re sorry, but you`ve reached the end of search results.');
      }
      createImageslist(data.hits);
      loadMoreBtn.hidden = true;
    }).catch (error => onFetchError());
}
    
function onLoadMore() {
  page += 1;
 
  fetchImages(searchQuery, page, imgPerPage).then(data => {
    const totalPages = data.totalHits / imgPerPage;

    if (page === totalPages) {
      loadMoreBtn.hidden = true;
      Notiflix.Notify.info('We`re sorry, but you`ve reached the end of search results.');
    }
      //  console.log(data)
        createImageslist(data.hits);
    }).catch (error => onFetchError());
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
    
    setStyles();
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

function clearMarkup() {
  gallery.innerHTML = '';
}

function onFetchError() {
     Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
}

function setStyles() {
  const info = document.querySelectorAll('.info');
  info.forEach(infoEl => {
    infoEl.style.display = 'flex';
    infoEl.style.gap = '20px';
    infoEl.style.alignItems = 'center';
  });
}
gallery.style.display = 'flex';
gallery.style.flexWrap = 'wrap';
gallery.style.gap = '10px';
// gallery.style.flexBasis = `${(100%-3*10)/4}`;