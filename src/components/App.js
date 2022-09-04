import { useState, useEffect, useRef } from 'react';
import { fetchImages } from '../../src/servises/pixabayApi';
import { Box } from 'components/Box';
import { Loader } from 'components/Loader/Loader';
import { Searchbar } from 'components/Searchbar/Searchbar';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { Modal } from 'components/Modal/Modal';
import { ModalImage } from 'components/Modal/Modal.styled';
import { Button } from 'components/Button/Button';


export const App = () => {

  const isMounted = useRef(false);
  const [images, setImages] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState('');
  const [tags, setTags] = useState('');

  useEffect(() => {
    setImages([]);
    setSearchQuery(searchQuery);
    setPage(1);
    setError('');
    setShowModal(false);
  }, [searchQuery]);

  useEffect(() => {
    if (isMounted.current) {
      fetchNewImages(searchQuery, page);
    }
    isMounted.current = true;
  }, [ page, searchQuery]);

  const handleFormSubmit = searchQuery => {
     setSearchQuery( searchQuery );
  }
  
  const fetchNewImages = async (searchQuery = '', page = 1) => {
    try {
      setIsLoading(true);

      const responceImages = await fetchImages(searchQuery, page);

      if (responceImages.length === 0) {
        throw new Error(`No result on request ${searchQuery}`)
      }
      const newImages = responceImages.map(
        ({ id, webformatURL, largeImageURL, tags }) => ({
          id, webformatURL, largeImageURL, tags,
        })
      );

      setImages(prevImages => [...prevImages, ...newImages])

    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };
  
    const openModal = ( tags, largeImageURL) => {
      setLargeImageURL(largeImageURL);
      setTags(tags);
      setShowModal(true);
    };
  
    const closeModal = () => {
    setShowModal(false);
    };
  
    const onClickLoadMoreBtn = () => {
      setPage(prevPage => prevPage + 1);
    };
  
  return (
    <Box>      
        <Searchbar onFormSubmit={handleFormSubmit}>Gallery</Searchbar>
      {images.length > 0 && 
        <>
          <ImageGallery images={images} openModal={openModal} />
          <Button handleClick={onClickLoadMoreBtn} />
        </>}
      {isLoading && <Loader />}
      {showModal && (
        <Modal onClose={closeModal} >
          <ModalImage src={largeImageURL} alt={tags} />
        </Modal>
        )}
    </Box>
  );
} 

