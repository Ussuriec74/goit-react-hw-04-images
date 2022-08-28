import { Component } from "react";
import PropTypes from 'prop-types';
import axios from 'axios';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { Loader } from 'components/Loader/Loader';
import { Box } from 'components/Box';
import { GalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Modal } from 'components/Modal/Modal';
import { Gallery } from 'components/ImageGallery/ImageGallery.styled';
import { Button } from 'components/Button/Button';
import { ModalImage } from 'components/Modal/Modal.styled';

axios.defaults.baseURL = 'https://pixabay.com/api';
const KEY = "28299403-f4195b0bf13d94bdbb03a95af";
const params = "image_type=photo&orientation=horizontal&safesearch=true&per_page=20";


export class ImageGallery extends Component {

  state = {
    images: [],
    page: 1,
    showModal: false,
    error: null,
    totalHits: null,
    isLoding: false,
  }
   
  prototype = {
  searchQuery: PropTypes.string.isRequired,
};

  async fetchImages() {
    const { page } = this.state;
    try {
      this.setState({ isLoding: true });
      const response = await axios.get(`/?key=${KEY}&q='${this.props.searchQuery}'&page=${page}&${params}`);

      if (page === 1 && response.data.totalHits !== 0) {
          Notify.success(` We found ${response.data.totalHits} images.`);
      }
      if (response.data.hits.length === 0) {
          Notify.failure(
        'Sorry, nothing found. Please try again.'
      );
        }

      return response;
    } catch (error) {
        this.setState({ error: error.message });
    } finally {
        this.setState({ isLoading: false });
      }
  }

  async componentDidUpdate(prevProps, prevState) {
    const { page } = this.state;
    if (prevProps.searchQuery !== this.props.searchQuery) {
      this.setState({
        page: 1,
        images: [],
      });
    }
    if (prevProps.searchQuery !== this.props.searchQuery && page !== 1) {
      return
    }
    if (prevProps.searchQuery !== this.props.searchQuery || prevState.page !== page) {
      
      const { data } = await this.fetchImages();
      this.setState((prevState) => {
        const { images } = prevState;
         return {
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

  openModal = ( tags, largeImageURL) => {
    this.setState({ largeImageURL, tags, showModal: true });
  };

  closeModal = () => {
    this.setState({ showModal: false });
  };
  
  render() {
    const {images, showModal, isLoading} = this.state;
    return (
      <Box>
        {isLoading && (
          <Loader />
        )}
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
        {images.length !== 0 && (
          <Button handleClick={this.onClickLoadMoreBtn}></Button>
          )}
        {showModal && (
          <Modal onClose={this.closeModal}>
            <ModalImage src={this.state.largeImageURL} alt={this.state.tags} />
            
          </Modal>
        )}

      </Box>
      
    );
  }
}
