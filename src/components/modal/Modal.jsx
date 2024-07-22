import React, { useEffect } from "react";
import css from "./Modal.module.scss";
import PropTypes from "prop-types";

const Modal = ({ imgSrc, imgAlt, closeHandler, escHandler }) => {
  useEffect(() => {
    document.addEventListener("keydown", escHandler);

    return () => {
      document.removeEventListener("keydown", escHandler);
    };
  }, [escHandler]);

  return (
    <div className={css["overlay"]} onClick={closeHandler}>
      <div className={css["modal"]}>
        <img src={imgSrc} alt={imgAlt} />
      </div>
    </div>
  );
};

Modal.propTypes = {
  imgSrc: PropTypes.string.isRequired,
  imgAlt: PropTypes.string.isRequired,
  closeHandler: PropTypes.func.isRequired,
  escHandler: PropTypes.func.isRequired,
};

export default Modal;
