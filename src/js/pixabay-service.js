// import Notiflix, { Notify } from 'notiflix';
import axios from 'axios';

const API_KEY = '31955904-7341a4dddd0022ded7445126a';
const URL_SETTINGS = `image_type=photo&orientation=horizontal&safesearch=true&per_page=40`;
axios.defaults.baseURL = 'https://pixabay.com/api';

export default class PixabayApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  async fetchImages() {
    console.log(this);

    try {
      const response = await axios.get(
        `/?key=${API_KEY}&q=${this.searchQuery}&page=${this.page}&${URL_SETTINGS}`
      );
      const data = await response.data;
      this.incrementPage();
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  incrementPage() {
    this.page += 1;
  }
  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
