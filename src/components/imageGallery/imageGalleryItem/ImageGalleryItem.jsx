import React from "react";
import css from "./ImageGalleryItem.module.scss";
import PropTypes from "prop-types";

const ImageGalleryItem = ({ id, src, alt, data, clickHandler }) => {
  return (
    <li className={css["item"]}>
      <img
        className={css["item-image"]}
        id={id}
        src={src}
        alt={alt}
        data-source={data}
        onClick={clickHandler}></img>
    </li>
  );
};

ImageGalleryItem.propTypes = {
  id: PropTypes.number.isRequired,
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  data: PropTypes.string.isRequired,
  clickHandler: PropTypes.func.isRequired,
};

export default ImageGalleryItem;
