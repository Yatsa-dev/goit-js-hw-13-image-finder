'use stricts';

import { Notify } from "notiflix";
import imageTemplates from './templates/image-card.hbs';
import './css/styles.css';
import NewsApiService from './js/api-service';

const newsApiService = new NewsApiService();
const refs = {
    searchForm: document.querySelector('#search-form'),
    galleryContainer: document.querySelector('.gallery'),
    add: document.querySelector('.add')
};
refs.add.addEventListener('click', () => {
    newsApiService.fetchApi().then(r => console.log(r.data.hits))

})
refs.searchForm.addEventListener('submit', onSearch)

function onSearch(event) {
    event.preventDefault();


    newsApiService.query = event.currentTarget.elements.searchQuery.value;
    newsApiService.resetPage()

    if (!newsApiService.query.trim()) {
        Notify.failure('Please try again',
            { fontFamily: "Quicksand", useGoogleFont: true, closeButton: true, rtl: true, useIcon: true, });
    }
    newsApiService.fetchApi().then(response => {

        if (response.data.totalHits === 0) {
            Notify.failure('Sorry, there are no images matching your search query. Please try again',
                { fontFamily: "Quicksand", useGoogleFont: true, closeButton: true, rtl: true, useIcon: true, });
        }
        if (response.data.totalHits > 0) {
            const markup = (response.data.hits).map(el => { renderImageCard(el) }).join(' ')
            refs.galleryContainer.insertAdjacentHTML('beforeend', markup);

            Notify.success(`Hooray! We found ${response.data.totalHits} images`,
                { fontFamily: "Quicksand", useGoogleFont: true, timeout: 3000, });
        }

    }).finally(refs.galleryContainer.innerHTML = '',
        newsApiService.query.trim());

    clearSearchField()



}







function renderImageCard(response) {
    const markup = imageTemplates(response);
    refs.galleryContainer.insertAdjacentHTML('beforeend', markup);
}
function clearSearchField() {
    refs.galleryContainer.innerHTML = '';
}
// function onSearch(event) {
//     event.preventDefault();
//     const searchQuery = refs.serchForm.value;

//     if (searchQuery === '') {
//         refs.countryList.innerHTML = ''
//         refs.cardContainer.innerHTML = ''
//         return
//     }
//     FetchAPI.fetchCountries(searchQuery)
//         .then(response => {
//             if (response.length === 1) {
//                 renderCountryCard(response);
//                 refs.countryList.innerHTML = '';
//                 return;
//             }
//             if (response.length > 1 && response.length < 11) {
//                 const markup = response
//                     .map(el => {
//                         return countryItemTpl(el);
//                     })
//                     .join('');
//                 refs.cardContainer.innerHTML = '';
//                 refs.countryList.innerHTML = markup;
//                 return;
//             }
//             if (response.length > 10) {
//                 Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
//             }
//         })
//         .catch(onFetchError)
//         .finally(
//             refs.cardContainer.innerHTML = ''
//         );
// }
// function onFetchError(error) {
//     if (error === 404) {
//         Notiflix.Notify.failure('Oops, there is no country with that name')
//     }
// }
// function renderCountryCard(country) {
//     const markup = countryTemplates(...country);
//     refs.cardContainer.insertAdjacentHTML('beforeend', markup);
// }

// function fetchCountries(name) {
//     return fetch(`https://restcountries.eu/rest/v2/name/${name}`)
//         .then(response => (response.ok)
//             ? response.json()
//             : Promise.reject(response.status))
// }


