import './Filters.css';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'; //conecta react-redux
import { filterByCreated, filterByBrand, getAllProducts, getBrands, filterByCategory, orderByName, getCategories, orderByPrice } from '../../redux/actions';
// import { filterByBrand } from ;
// import Loader from '../Loader/Loader.jsx';


export default function Filters () {
    // loader
    // const loader = useSelector(state => state.loader);

    const dispatch = useDispatch();
    const brands = useSelector(state => state.brands);
    const categories = useSelector(state => state.categories);
    // const currentProducts = useSelector((state) => state.products);
    // const products = useSelector((state) => state.products);
    const [order, setOrder] = useState('');
    // console.log(order);

useEffect(() => {
    dispatch(getAllProducts());
    dispatch(getBrands());
    dispatch(getCategories());
}, [dispatch]);

const handleFilterByBrand = (event) => {
    console.log(event.target.value);
    dispatch(filterByBrand(event.target.value))
    setOrder(event.target.value);   

}

const handleFilterByCreated = (event) => {
    dispatch(filterByCreated(event.target.value))
}

const handleOrderByName = (event) => {
    dispatch(orderByName(event.target.value));
    setOrder(event.target.value);   
}

const handlefilterByCategory = (event) => {
    dispatch(filterByCategory(event.target.value));
    console.log(event.target.value);
}
const handleOrderByPrice = (event) => {
    dispatch(orderByPrice(event.target.value));
    setOrder(event.target.value);
}

// reset: 

const handleReset = (event) => {
    event.preventDefault();
    dispatch(getBrands());
    dispatch(getAllProducts());
    document.getElementById('order').value = 'order';
    // document.getElementById('price').value = 'price'; // **Precio
    document.getElementById('created').value = 'all';
    document.getElementById('brands').value = 'brand';
    alert('Loading...');
}

return (
    <section id='container' className='section-filters'>
    
        <div className='filt-order-cont'>
            <div className='filters'>
                <select className='filter-butt' id='order' onChange={(event) => handleOrderByName(event)}>
                    <option key="order" value="order">Order Name</option>
                    <option key="A-Z" value="A-Z">A - Z</option>
                    <option key="Z-A" value="Z-A">Z - A</option>
                </select>
                <select className='filter-butt' id='order-category' onChange={(event) => handlefilterByCategory(event)}>
                    <option key="order" value="order">Filter Category</option>
                    <option key="A-Z" value="A-Z">A - Z</option>
                    {categories.length > 0 && categories.map((category, index) => (
                    <option key={index} value={category}>{category}</option>
                ))}
                </select>
                <select className='filter-butt' id='price' onChange={(event) => handleOrderByPrice(event)}>
                    <option value="price">Price</option>
                    <option value="min">Menor a mayor</option>
                    <option value="max">Mayor a menor</option>
                </select>
            </div>
            <div className='order'>
            <select className='order-butt' id='brands' onChange={(event) => handleFilterByBrand(event)}>
                <option key="brand" value="brand">Brand</option>
                <option key="all" value="All">All</option>
                {brands.length > 0 && brands.map((brand, index) => (
                    <option key={index} value={brand.name}>{brand.name}</option>
                ))}
            </select>
                <select className='order-butt' id='created' onChange={(event) => handleFilterByCreated(event)}>
                    <option key="create" value="All">All Products</option>
                    <option key="create2" value="created">Customized</option>
                    <option key="create3" value="not-created">Not Customized</option>
                </select>
            </div>
            <div className='reset'>
                <button type='submit' className='reset-button' onClick={(event) => handleReset(event)}>Reset</button>
            </div>
        </div>
            
    </section>
);
};

//  {/* <div className='products-grid'>
//                 {
//                     !loader ? <Loader/> : currentProducts.map((product) => {
//                         return (
//                             <Card
//                             id={product.id}
//                             name={product.name}
//                             price={product.price}
//                             img={product.imgUrl}
//                             key={pokemon.id}
//                             brands={product.brand}
//                             // Stock= {product.stock}
//                             />)
//                         })
//                     }
//         </div> */}