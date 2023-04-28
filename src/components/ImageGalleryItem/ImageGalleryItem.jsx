import { useState } from 'react';
import PropTypes from 'prop-types';

import Modal from 'components/Modal';
import { GalleryItem, GalleryImage } from './ImageGalleryItem.styled';

const ImageGalleryItem = ({ smallImage, largeImage, tags }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <>
      <GalleryItem onClick={() => setIsModalOpen(true)}>
        <GalleryImage src={smallImage} alt={tags} loading="lazy" />
      </GalleryItem>

      {isModalOpen && (
        <Modal
          image={largeImage}
          tags={tags}
          onClose={() => setIsModalOpen(false)}
        ></Modal>
      )}
    </>
  );
};

ImageGalleryItem.propTypes = {
  smallImage: PropTypes.string.isRequired,
  largeImage: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
};

export default ImageGalleryItem;
