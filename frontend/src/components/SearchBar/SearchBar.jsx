import React from "react";
import { useState } from "react";
import {useDispatch} from "react-redux"
import { getProductByName } from "../../redux/actions"; 
import styles from "./SearchBar.module.css";
const SearchBar = () => {
    
  const dispatch = useDispatch()
  const [name, setName] = useState("")
  function inputHandleChange (e){
    e.preventDefault()
    setName(e.target.value)
  }

  function handleSubmit (e){
    e.preventDefault()
    dispatch(getProductByName(name))
    setName("")
  }
  function handleKeyDown(e){
    if(e.key === "Enter"){
      handleSubmit(e)
    }
  }

  return (
    <div className={styles.searchbar}>
      <input type="text" className={styles.input} placeholder="Buscar" value={name} onChange={(e)=>inputHandleChange(e)} onKeyDown={(e) => handleKeyDown(e)}/>
      <button className={styles.button} type="submit" onClick={(e)=> handleSubmit(e)}>
      🔎</button>
    </div>
  );
};

export default SearchBar;