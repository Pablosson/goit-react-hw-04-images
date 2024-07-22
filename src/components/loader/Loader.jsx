import React from "react";
import { ThreeDots } from "react-loader-spinner";
import css from "./Loader.module.scss";

const Loader = () => {
  return (
    <div className={css["wrapper"]}>
      <ThreeDots
        height="80"
        width="80"
        radius="9"
        color="#808080"
        ariaLabel="three-dots-loading"
        wrapperStyle={{}}
        wrapperClassName=""
        visible={true}
      />
    </div>
  );
};

export default Loader;
