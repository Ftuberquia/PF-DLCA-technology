import CardFav from './CardFav/CardFav'

import style from './Contenedor.module.css'
const Contenedor = (props) => {

    const { products, userId } = props;

    return (
      <div className={style.contGeneral}>
    <div className={style.contenedor}>
             {products.length === 0 ? (
        <h1 className={style.noproducts}>No hay productos favoritos</h1>
      ) : (
        products?.map(({ id, name, imageSrc, price, stock, isActive }) => {
          if (isActive===true) {
            return (
              <CardFav
                key={id}
                id={id}
                name={name}
                imageSrc={imageSrc}
                price={price}
                stock={stock}
                quantity={1}
                userId={userId}
              />
            );
          }
          return false;
        })
      )}
    </div>
      </div>
  );
};

export default Contenedor;