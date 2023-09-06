import Card from '../Card/Card'

import style from './Cards.module.css'
const Cards = (props) => {

    const {products}=props
    const productsData=products
    
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