import React, { useEffect } from "react";
import ImageGalleryItem from "./imageGalleryItem/ImageGalleryItem";
import css from "./ImageGallery.module.scss";
import PropTypes from "prop-types";

const ImageGallery = ({ images, page, clickHandler }) => {
  useEffect(() => {
    if (page !== 1 && images.length > 0) {
      window.scrollBy({ top: 520, behavior: "smooth" });
    }
  }, [images.length, page]);

  return (
    <ul className={css["image-gallery"]}>
      {images.map((image) => (
        <ImageGalleryItem
          key={image.id}
          id={image.id}
          src={image.small}
          data={image.large}
          alt={image.alt}
          clickHandler={clickHandler}
        />
      ))}
    </ul>
  );
};

ImageGallery.propTypes = {
  page: PropTypes.number.isRequired,
  clickHandler: PropTypes.func.isRequired,
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      small: PropTypes.string.isRequired,
      large: PropTypes.string.isRequired,
      alt: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
};

export default ImageGallery;
