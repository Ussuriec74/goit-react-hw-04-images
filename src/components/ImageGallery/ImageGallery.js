import PropTypes from 'prop-types';
import { GalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Gallery } from 'components/ImageGallery/ImageGallery.styled';


export const ImageGallery = ({ images, openModal }) => {
  return (
    <Gallery>
      {images.map(({ id, tags, webformatURL, largeImageURL }) => (
        <GalleryItem
              key={id}
              tags={tags}
              galleryImage={webformatURL}
              modalImage={largeImageURL}
              openModal={openModal} 
            />
      ))}
    </Gallery>
  )
}

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
    })
  ),
  openModal: PropTypes.func.isRequired,
};
