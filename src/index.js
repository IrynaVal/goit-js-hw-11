import Notiflix from 'notiflix';
import { fetchImages } from './fetchImages.js';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

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
  clearMarkup();
  searchQuery = evt.currentTarget.elements.searchQuery.value.trim();
   if (searchQuery === '') {
    onFetchError();
    return;
    }
  page = 1;
 
  fetchImages(searchQuery, page, imgPerPage).then(data => {
    console.log(data.hits)
    console.log(data.totalHits)
        if (data.totalHits === 0) {
          onFetchError();
          return;
      }
            
  Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`);
        
      if (data.totalHits <= imgPerPage) {
        // loadMoreBtn.hidden = true;
        // Notiflix.Notify.info('We`re sorry, but you`ve reached the end of search results.');
        onEndMessage();
  }
  createImageslist(data.hits);
      loadMoreBtn.hidden = false;
    }).catch (error => onFetchError());
}
    
function onLoadMore() {
  page += 1;
 
  fetchImages(searchQuery, page, imgPerPage).then(data => {
    // console.log(data)
    createImageslist(data.hits);
    // lightboxGallery.refresh();
    // data.totalHits <= imgPerPage * page

    if (data.hits.length <  imgPerPage || data.totalHits === imgPerPage * page) {
      // loadMoreBtn.hidden = true;
      // Notiflix.Notify.info('We`re sorry, but you`ve reached the end of search results.');
      onEndMessage();
    }
    
  }).catch(error => onFetchError());
  
}

function createImageslist(images) {
    console.log(images)
    const markup = images.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) =>
        `<div class="photo-card">
    <a href="${largeImageURL}" class="photo-link">
    <img class="card-img" src="${webformatURL}" alt="${tags}" loading="lazy" width="370" height="250"/>
    </a>
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
  
  const lightboxGallery = new SimpleLightbox('.gallery a');

  lightboxGallery.refresh();
    setStyles();
}

function clearMarkup() {
  gallery.innerHTML = '';
}

function onFetchError() {
     Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
}

function setStyles() {
  const imgInfo = document.querySelectorAll('.info');
  imgInfo.forEach(infoEl => {
    infoEl.style.display = 'flex';
    infoEl.style.gap = '10px';
    infoEl.style.justifyContent = 'space-around';
    infoEl.style.width = '370px';
  });
}

  function onEndMessage() {
    loadMoreBtn.hidden = true;
        Notiflix.Notify.info('We`re sorry, but you`ve reached the end of search results.');
  }
