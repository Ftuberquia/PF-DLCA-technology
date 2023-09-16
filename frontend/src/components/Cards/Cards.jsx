import Card from '../Card/Card'

import style from './Cards.module.css'
const Cards = (props) => {

    const { products, handleNextPage, handlePrevPage, isLastPage, page } = props;

    return (
      <div className={style.contGeneral}>
    <div className={style.contenedorCards}>
             {products.length === 0 ? (
        <h1 className={style.noCards}>No hay productos con esas características</h1>
      ) : (
        products?.map(({ id, name, imageSrc, price, rating, stock, isActive }) => {
          if (isActive===true) {
            return (
              <Card
                key={id}
                id={id}
                name={name}
                imageSrc={imageSrc}
                price={price}
                rating={rating}
                stock={stock}
                quantity={1}
              />
            );
          }
          return false;
        })
      )}
    </div>
    <div className={style.contPag}>
      <button className={style.button1} onClick={handlePrevPage} disabled={page === 1}>Anterior</button>
      <button className={style.button2} onClick={handleNextPage} disabled={isLastPage||products.length===0}>Siguiente</button>
    </div>
      </div>
  );
};

export default Cards;