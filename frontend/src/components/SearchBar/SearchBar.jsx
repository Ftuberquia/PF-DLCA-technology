import React from "react";
import styles from "./SearchBar.module.css";

const SearchBar = () => {
  return (
    <div className={styles.searchbar}>
      <input type="text" className={styles.input} placeholder="Buscar" />
      <button className={styles.button}>
        <i className="fas fa-search"></i>
      </button>
    </div>
  );
};

export default SearchBar;