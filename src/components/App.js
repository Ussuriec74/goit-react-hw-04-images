import { useState, useEffect } from 'react';
import { fetchImages } from '../../src/servises/pixabayApi';
import { Box } from 'components/Box';
import { Loader } from 'components/Loader/Loader';
import { Searchbar } from 'components/Searchbar/Searchbar';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { Modal } from 'components/Modal/Modal';
import { ModalImage } from 'components/Modal/Modal.styled';
import { Button } from 'components/Button/Button';




export const App = () => {

  const [images, setImages] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [error, setError] = useState('');
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
    fetchNewImages(searchQuery, page);
  }, [page, searchQuery]);

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
//   state = {
//     images: [],
//     searchQuery: '',
//     page: 1,
//     error: '',
//     isLoading: false,
//     showModal: false,
//     largeImageURL: '',
//     tags: '',
//   };

//   componentDidUpdate(_, prevState) {
//     const { searchQuery, page } = this.state;
//     if (prevState.searchQuery !== this.state.searchQuery) {
//       this.setState({
        
//         images: [],
//         searchQuery,
//         page: 1,
//         error: '',
//         showModal: false,
//       });
//     }
//     if (prevState.searchQuery !== this.state.searchQuery && page !== 1) {
//       return
//     }
//     if (prevState.searchQuery !== this.state.searchQuery || prevState.page !== page) {
//       this.fetchNewImages(searchQuery, page);
//         }
//     }
  
  
//   hendleFormSubmit = searchQuery => {
//     this.setState({ searchQuery });
//   }

  // fetchNewImages = async (searchQuery = '', page = 1) => {
  //   try {
  //     this.setState({ isLoading: true });
  //     const responceImages = await fetchImages(searchQuery, page);

  //     if (responceImages.length === 0) {
  //       throw new Error(`No result on request ${searchQuery}`)
  //     }
  //     const newImages = responceImages.map(
  //       ({ id, webformatURL, largeImageURL, tags }) => ({
  //         id, webformatURL, largeImageURL, tags,
  //       })
  //     );
  //     this.setState(prevState => ({
  //       images: [...prevState.images, ...newImages],
  //     }));
  //   } catch (error) {
  //     this.setState({
  //       error: error.message,
  //     });
  //   } finally {
  //     this.setState({ isLoading: false });
  //   }
  // };

  // openModal = ( tags, largeImageURL) => {
  //   this.setState({ largeImageURL, tags, showModal: true });
  // };

  

  // onClickLoadMoreBtn = () => {
  //   this.setState(prevState => ({
  //     page: prevState.page + 1,
  //   }))
  // };
  
//   render() {
//     const { isLoading, images, largeImageURL, tags } = this.state;
    
//     return (
//       <Box>      
//         <Searchbar onFormSubmit={this.hendleFormSubmit}>Gallery</Searchbar>
//         {images.length > 0 && 
//           <>
//             <ImageGallery images={images} openModal={this.openModal} />
//             <Button handleClick={this.onClickLoadMoreBtn} />
//           </>}
//         {isLoading && <Loader />}
//         {this.state.showModal && (
//           <Modal onClose={this.closeModal} >
//             <ModalImage src={largeImageURL} alt={tags} />
//           </Modal>
//           )}
//       </Box>
//     );
// //   }
// // }
