import { Component } from "react";
import axios from 'axios';
import { Box } from 'components/Box';
import {GalleryItem} from 'components/ImageGalleryItem/ImageGalleryItem';

axios.defaults.baseURL = 'https://pixabay.com/api';
const KEY = "28299403-f4195b0bf13d94bdbb03a95af";
const params = "image_type=photo&orientation=horizontal&safesearch=true&per_page=20";


export class ImageGallery extends Component {

  state = {
    images: [],
    page: 1,
  }
   
  async fetchImages() {
    try {
      const responce = await axios.get(`/?key=${KEY}&q='${this.props.searchQuery}'&page='${this.state.page}'&${params}`);
      
      return responce;
    } catch (error) {
      alert(error);
    }
  }

  async componentDidUpdate(prevProps, prevState) {
    if (prevProps.searchQuery !== this.props.searchQuery) {
      const { data } = await this.fetchImages();
      this.setState((prevState) => {
        const { images } = prevState;
        return {
          images: [...images, ...data.hits],
        }
      });
    }
  }
  
  render() {
    const { images = [] } = this.state;
    debugger;
    return (
      <Box as='ul'>
        {images.map(({ id, tags, webformatURL, largeImageURL }) => {
          <GalleryItem
            key={id}
            tags={tags}
            galleryImage={webformatURL}
            modalImage={largeImageURL}
          />
        })}
      </Box>
    );
  }
}
