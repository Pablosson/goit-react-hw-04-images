import React, { useState } from "react";
import css from "./Searchbar.module.scss";
import PropTypes from "prop-types";

const Searchbar = ({ onSubmit }) => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ query });
  };

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  return (
    <header className={css["searchbar"]}>
      <form className={css["form"]} onSubmit={handleSubmit}>
        <button type="submit" className={css["button"]}>
          <span className={css["button-label"]}>Search</span>
        </button>

        <input
          name="query"
          className={css["input"]}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={query}
          onChange={handleInputChange}
        />
      </form>
    </header>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;
