import axios from 'axios';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

axios.defaults.baseURL = 'https://pixabay.com/api';
const KEY = "28299403-f4195b0bf13d94bdbb03a95af";
const params = "image_type=photo&orientation=horizontal&safesearch=true&per_page=20";

async function fetchImages(searchQuery = '', page = 1) {
    
    try {
      const response = await axios.get(`/?key=${KEY}&q='${searchQuery}'&page=${page}&${params}`);

      if (page === 1 && response.data.totalHits !== 0) {
          Notify.success(` We found ${response.data.totalHits} images.`);
      }
      if (response.data.hits.length === 0) {
          Notify.failure(
        'Sorry, nothing found. Please try again.'
      );
        }

      return response.data.hits;
    } catch (error) {
        Notify.error(error);
    } 
}
  
export { fetchImages };