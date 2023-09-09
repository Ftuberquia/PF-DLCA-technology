import Card from '../Card/Card'

import style from './Cards.module.css'
const Cards = (props) => {

    const { products, scroll } = props;
    
    return (
        <div className={style.contenedorCards} style={{ height: "500px", overflow: "auto" }} onScroll={(e)=>scroll(e)}>
             {products.length === 0 ? (
        <h1 className={style.noCards}>No hay productos con esas características</h1>
      ) : (
        products.map(({ id, name, imageSrc, price, rating, stock, disabled }) => {
          if (!disabled) {
            return (
              <Card
                key={id}
                id={id}
                name={name}
                imageSrc={imageSrc}
                price={price}
                rating={rating}
                stock={stock}
              />
            );
          }
          return false;
        })
      )}
    </div>
  );
};

export default Cards;