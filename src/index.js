// import debounce from 'lodash.debounce';
import Notiflix, { Notify } from 'notiflix';

import PixabayApiService from './pixabay-service';

// const API_KEY = '31955904-7341a4dddd0022ded7445126a';
// const URL = `https://pixabay.com/api/?key=${API_KEY}&q=${name}&image_type=photo&orientation=horizontal&safesearch=true&page=1&per_page=40`;

const refs = {
  inputEl: document.querySelector('#search-form'),
  showMoreBtnEl: document.querySelector('.show-more-btn'),
  galleryEl: document.querySelector('.gallery'),
};

const pixabayApiService = new PixabayApiService();

refs.showMoreBtnEl.setAttribute('disabled', true);
refs.inputEl.addEventListener('submit', onFormSubmit);
refs.showMoreBtnEl.addEventListener('click', onLoadMore);

function onFormSubmit(evt) {
  evt.preventDefault();
  clearHtmlMarkup();
  pixabayApiService.query = evt.currentTarget.elements.searchQuery.value.trim();

  if (pixabayApiService.query === '') {
    Notify.failure('Введіть свій пошуковий запит');
    return;
  }

  pixabayApiService.resetPage();
  pixabayApiService.fetchImages().then(appendDataMarkup);
}

function onLoadMore() {
  pixabayApiService.fetchImages().then(appendDataMarkup);
}

function appendDataMarkup(items) {
  const dataListMarkup = items
    .map(item => {
      return `<div class="photo-card">
      <img src="${item.previewURL}" alt=${item.tags}" loading="lazy" />
      <div class="info">
        <p class="info-item">
          <b>Likes ${item.likes}</b>
        </p>
        <p class="info-item">
          <b>Views ${item.views}</b>
        </p>
        <p class="info-item">
          <b>Comments ${item.comments}</b>
        </p>
        <p class="info-item">
          <b>Downloads ${item.downloads}</b>
        </p>
      </div>
    </div>`;
    })
    .join(' ');
  refs.galleryEl.insertAdjacentHTML('beforeend', dataListMarkup);
  refs.showMoreBtnEl.removeAttribute('disabled');
}

function clearHtmlMarkup() {
  refs.galleryEl.innerHTML = '';
}
