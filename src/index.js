'use stricts';

import Notiflix from "notiflix";
import countryTemplates from './templates/country-card.hbs';
import FetchAPI from './js/fetchCountries'
import './css/styles.css';


const refs = {

};


function onSearch(event) {
    event.preventDefault();
    const searchQuery = refs.serchForm.value;

    if (searchQuery === '') {
        refs.countryList.innerHTML = ''
        refs.cardContainer.innerHTML = ''
        return
    }
    FetchAPI.fetchCountries(searchQuery)
        .then(response => {
            if (response.length === 1) {
                renderCountryCard(response);
                refs.countryList.innerHTML = '';
                return;
            }
            if (response.length > 1 && response.length < 11) {
                const markup = response
                    .map(el => {
                        return countryItemTpl(el);
                    })
                    .join('');
                refs.cardContainer.innerHTML = '';
                refs.countryList.innerHTML = markup;
                return;
            }
            if (response.length > 10) {
                Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
            }
        })
        .catch(onFetchError)
        .finally(
            refs.cardContainer.innerHTML = ''
        );
}
function onFetchError(error) {
    if (error === 404) {
        Notiflix.Notify.failure('Oops, there is no country with that name')
    }
}
function renderCountryCard(country) {
    const markup = countryTemplates(...country);
    refs.cardContainer.insertAdjacentHTML('beforeend', markup);
}



