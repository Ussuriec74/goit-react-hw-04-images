import PropTypes from 'prop-types';
import { ImageGalleryItem, Image } from 'components/ImageGalleryItem/ImageGalleryItem.styled'

export const GalleryItem = ({ tags, galleryImage, modalImage, openModal}) => {
  
  return (
    <ImageGalleryItem onClick={() => openModal(tags, modalImage)}>
      <Image src={galleryImage} alt={tags} />
    </ImageGalleryItem>
  )
}

GalleryItem.prototype = {
  tags: PropTypes.string.isRequired,
  galleryImage: PropTypes.string.isRequired,
  modalImage: PropTypes.string.isRequired,
  openModal: PropTypes.func.isRequired,
};

