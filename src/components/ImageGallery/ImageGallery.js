import { Component } from "react";
import axios from 'axios';
import { Box } from 'components/Box';
import { GalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Modal } from 'components/Modal/Modal';
import { Gallery } from 'components/ImageGallery/ImageGallery.styled';
import { Button } from 'components/Button/Button';

axios.defaults.baseURL = 'https://pixabay.com/api';
const KEY = "28299403-f4195b0bf13d94bdbb03a95af";
const params = "image_type=photo&orientation=horizontal&safesearch=true&per_page=20";


export class ImageGallery extends Component {

  state = {
    images: [],
    page: 1,
    showModal: false,
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
          ...prevState,
          images: [...images, ...data.hits],

        }
      });
    }
  }

  onClickLoadMoreBtn = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }))
  }

  openModal = (largeImageURL, tags) => {
    this.setState({ largeImageURL, tags, showModal: true });
  };

  closeModal = () => {
    this.setState({ showModal: false });
  };
  
  render() {
    const {images, showModal} = this.state;
    return (
      <Box>
        <Gallery>
          {images.map(({ id, tags, webformatURL, largeImageURL }) => (
            <GalleryItem
              key={id}
              tags={tags}
              galleryImage={webformatURL}
              modalImage={largeImageURL}
              openModal={this.openModal} 
            />
          ))}
        </Gallery>
        <Button handleClick={this.onClickLoadMoreBtn}></Button>
        {showModal && (
          <Modal
            onClose={this.closeModal}
            tags={images.tags}
            modalImage={images.largeImageURL}/>
        )}

      </Box>
      
    );
  }
}
