import Card from '../Card/Card'
import { useSelector } from 'react-redux';

import style from './Cards.module.css'
const Cards = () => {

    const productsData = useSelector(state => state.products)

    return (
        <div className={style.contenedorCards}>
            {productsData?.map(({ id, name, imageSrc, price, rating, stock, disabled }) => {
                if (!disabled) {
                    return (
                        <Card 
                        key={id} 
                        id={id} 
                        name={name} 
                        imageSrc={imageSrc} 
                        price={price} 
                        rating={rating} 
                        stock={stock} />
                    );
                }
                return null;
            })}
        </div>
    );
};

export default Cards;