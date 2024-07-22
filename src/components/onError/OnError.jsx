import React from "react";
import css from "./OnError.module.scss";
import PropTypes from "prop-types";

const OnError = ({ children }) => {
  return <div className={css["wrapper"]}>{children}</div>;
};

OnError.propTypes = {
  children: PropTypes.node.isRequired,
};
export default OnError;
