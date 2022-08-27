import { ImageGalleryItem, Image } from 'components/ImageGalleryItem/ImageGalleryItem.styled'

export const GalleryItem = ({ tags, galleryImage, modalImage, openModal }) => {
  return (
    <ImageGalleryItem onClick={() => openModal(tags, modalImage)}>
      <Image src={galleryImage} alt={tags} />
    </ImageGalleryItem>
  )
}