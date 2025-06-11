import { useEffect, useState } from 'react';

import styles from './Search.module.css';

function Search({onSearch}) {

  const handleChange = (e) => {
    const val = e.target.value;
    onSearch(val);
  };

  return (
    <div className={styles.searchContainer}>
        <input type="text" placeholder="Buscar..." onChange={handleChange}/>
    </div>
  )
}   
export default Search;