import axios from 'axios';
const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '23103282-e7d496618b624ef4484ab3d5c';
export default class NewsApiService {
    constructor() {
        this.searchQuery = '';
        this.page = 1;
    };
    fetchApi() {
        return axios.get(`${BASE_URL}?key=${API_KEY}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=${this.page}&per_page=40`);
    };

    get query() {
        return this.searchQuery;
    };
    set query(newQuery) {
        this.searchQuery = newQuery;
    }
}
// const options = {
//     headers: {
//         Authorization: '23103282-e7d496618b624ef4484ab3d5c',
//     }
// }