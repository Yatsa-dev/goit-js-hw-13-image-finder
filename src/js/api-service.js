import axios from 'axios';
const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '23103282-e7d496618b624ef4484ab3d5c';

export default class NewsApiService {
    constructor() {
        this.searchQuery = '';
        this.page = 0;
    };
    fetchApi() {
        this.incrementPage()
        const searchParams = new URLSearchParams({
            q: this.searchQuery,
            page: this.page,
            per_page: '12',
            image_type: 'photo',
            orientation: 'horizontal',
            safesearch: 'true'
        })

        const url = `${BASE_URL}?key=${API_KEY}&${searchParams}`;
        return axios.get(url);
    };

    get query() {
        return this.searchQuery.trim();
    };
    set query(newQuery) {
        this.searchQuery = newQuery;
    }
    resetPage() {
        this.page = 0;
    }
    incrementPage() {
        this.page += 1;
    }
}