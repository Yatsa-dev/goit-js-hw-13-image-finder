'use stricts';
import { Notify } from "notiflix";
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import imageTemplates from './templates/image-card.hbs';
import NewsApiService from './js/api-service';
import './css/styles.css';

const newsApiService = new NewsApiService();


const refs = {
    searchForm: document.querySelector('#search-form'),
    galleryContainer: document.querySelector('.gallery'),
    add: document.querySelector('.add')
};
refs.add.addEventListener('click', onLoadMore)
refs.searchForm.addEventListener('submit', onSearch)


new SimpleLightbox('.gallery a');

function onSearch(event) {
    event.preventDefault();

    newsApiService.query = event.currentTarget.elements.searchQuery.value;
    newsApiService.resetPage()
    if (newsApiService.query === '') {
        Notify.failure('Sorry,input field is empty.Please try again',
            { fontFamily: "Quicksand", useGoogleFont: true, closeButton: true, rtl: true, useIcon: true, });
        return
    }
    newsApiService.fetchApi().then(response => {
        const result = response.data.total;
        if (result === 0) {
            Notify.failure('Sorry, there are no images matching your search query. Please try again',
                { fontFamily: "Quicksand", useGoogleFont: true, closeButton: true, rtl: true, useIcon: true, });
        }
        if (result > 0) {
            const markup = (response.data.hits)
                .map(el => renderImageCard(el))
                .join('')
            refs.galleryContainer.insertAdjacentHTML('beforeend', markup);

            Notify.success(`Hooray! We found ${result} images`,
                { fontFamily: "Quicksand", useGoogleFont: true, timeout: 3000, });
        }

    }).finally(refs.galleryContainer.innerHTML = '');

    clearSearchField()
}
function renderImageCard(image) {
    refs.galleryContainer.insertAdjacentHTML('beforeend', imageTemplates(image));
}
function clearSearchField() {
    refs.galleryContainer.innerHTML = '';
}
function onLoadMore() {
    newsApiService.fetchApi().then(response => {
        const markup = (response.data.hits)
            .map(el => renderImageCard(el))
            .join('')
        refs.galleryContainer.insertAdjacentHTML('beforeend', markup);
    })
}