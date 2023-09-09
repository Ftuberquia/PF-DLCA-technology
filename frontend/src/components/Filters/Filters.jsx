import './Filters.css';
import React, { useEffect,useRef } from 'react';

import { useDispatch, useSelector } from 'react-redux'; //conecta react-redux
import { getBrands, getCategories, getSubCategories} from '../../redux/actions';
// import Loader from '../Loader/Loader.jsx';

export default function Filters ({updateFilters}) {
    // loader
    // const loader = useSelector(state => state.loader);

    const dispatch = useDispatch();
    const brands = useSelector(state => state.brands);
    const categories = useSelector(state => state.categories);
    const subcategories = useSelector(state => state.subcategories)

    const filterBrand = useRef(null)
    const filterCategory = useRef(null)
    const filterSubcategories = useRef(null)
    const orderPrice = useRef(null)
    const orderName = useRef(null)

    useEffect(() => {
        dispatch(getBrands());
        dispatch(getCategories());
        dispatch(getSubCategories());
    }, [dispatch]);

    const handleFilterChange = (fieldName, selectedValue) => {
        updateFilters(fieldName, selectedValue);
        if(fieldName==='order'&&selectedValue!=='undefined'){
            orderPrice.current.value = "undefined"
        }
        if(fieldName==='price'&&selectedValue!=='undefined'){
            orderName.current.value = "undefined"
        }
      };
    
// reset: 
const handleReset = (event) => {
    event.preventDefault();
    //forma de hacer que se reseteen los filtros
    orderName.current.value = 'undefined'
    orderPrice.current.value = "undefined"
    filterBrand.current.value = 'undefined'
    filterCategory.current.value = 'undefined'
    filterSubcategories.current.value = 'undefined'
    alert('Loading...');
}

return (
    <section id='container' className='section-filters'>
    
        <div className='filt-order-cont'>
            <div className='filters'>
                <select className='filter-butt' ref={orderName} onChange={(e) => handleFilterChange('order', e.target.value)} defaultValue="undefined">
                    <option value="undefined" disabled>Orden alfabetico</option>
                    <option value="ASC">A - Z</option>
                    <option value="DESC">Z - A</option>
                </select>
                <select className='filter-butt' ref={filterCategory} onChange={(e) => handleFilterChange('category', e.target.value)}defaultValue="undefined">
                    <option value="undefined" >Categorias</option>
                    {categories.length > 0 && categories.map((category, index) => (
                    <option key={index} value={category}>{category}</option>
                ))}
                </select>
                <select className="filter-butt" ref={filterSubcategories} onChange={(e) => handleFilterChange('subcategory', e.target.value)} defaultValue="All">
                    <option value="undefined">Subcategorias</option>
                    {subcategories.length > 0 && subcategories.map((subcategory, index)=> (
                        <option key={index} value={subcategory}>{subcategory}</option>
                    ))}
                </select>
                <select className='filter-butt' ref={orderPrice} onChange={(e) => handleFilterChange('priceOrder', e.target.value)} defaultValue="undefined">
                    <option value="undefined" disabled>Orden por precio</option>
                    <option value="ASC">Menor a mayor</option>
                    <option value="DESC">Mayor a menor</option>
                </select>
            </div>
            <div className='order'>
            <select className='order-butt' ref={filterBrand} onChange={(e) => handleFilterChange('brand', e.target.value)} defaultValue="undefined">
                <option value="undefined">Marcas</option>
                {brands.length > 0 && brands.map((brand, index) => (
                    <option key={index} value={brand.name}>{brand.name}</option>
                ))}
            </select>
            </div>
            <div className='reset'>
                <button type='submit' className='reset-button' onClick={(event) => handleReset(event)}>Reset</button>
            </div>
        </div>
            
    </section>
);
};