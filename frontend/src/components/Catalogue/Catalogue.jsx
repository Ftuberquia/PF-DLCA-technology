import React from "react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import Cards from "../Cards/Cards.jsx";
import { useSelector, useDispatch } from "react-redux";
import { getAllProducts } from "../../redux/actions/index.js";
import styles from "./Catalogue.module.css";

function Catalogue() {
	
	const dispatch = useDispatch();
	const productsData = useSelector((state) => state.products);
    const user = useSelector((state) => state.user);
    // const cart = useSelector((state) => state.cart);
    
    
    // useEffect(() => {
    //     if (user && user.id && cart) {
    //         dispatch(postCartInDB({userId: user.id, cartElements: cart}));
    //         dispatch(getUsers());
    //     }
    // }, [user, dispatch, cart]);

	return (
		<div className={styles.container} style={{position:'relative'}}>
			{user && user.role == 2 && <Link to='/categories' style={{cursor:'pointer',position:'fixed',bottom:25,right:25}}><button style={{border:'none',padding:10,borderRadius:'50%'}}> <h1>+</h1></button></Link> }
			<Cards products={productsData} />
		</div>
	);
}

export default Catalogue;