import { useDispatch } from "react-redux";
import { useState } from "react";



const FormProduct = ({ dataProd, idProduct, setMod }) => {
    const dispatch = useDispatch();
  
    const onChangeInput = (event) => {
      setProduct({ ...product, [event.target.name]: event.target.value });
    };
  
    const handleInput = (value) => {
      swal({
        title: "Confirmar",
        text: `¿Estás seguro de que quieres ${value ? 'activar' : 'desactivar'} el producto?`,
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then((confirm) => {
        if (confirm) {
          setProduct({ ...product, isActive: value });
        }
      });
    };
  
  
  const dataP = dataProd[0]
  console.log(dataP)
    const [product, setProduct] = useState({
      name: dataP.name,
      href: dataP.href,
      imageSrc: dataP.imageSrc,
      imageAlt: dataP.imageAlt,
      price: dataP.price,
      brand: dataP.brand,
      stock: dataP.stock,
      category: dataP.category,
      description: dataP.description,
      isActive: dataP.isActive,
    });
    //console.log(product);
    return (
      <form action="" className="formulario" onSubmit={handleInfo}>
        <div>
          <label htmlFor="">Name</label>
          <input
            type="text"
            // placeholder="nombre del producto"
            name="name"
            value={product.name}
            onChange={onChangeInput}
          />
        </div>
        <div>
          <label htmlFor="">Href</label>
          <input
            type="text"
            placeholder="#"
            name="href"
            value={product.href}
            onChange={onChangeInput}
          />
        </div>
        <div>
          <label htmlFor="">imageSrc</label>
          <input
            type="text"
            placeholder="imagen del producto..."
            name="imageSrc"
            value={product.imageSrc}
            onChange={onChangeInput}
          />
        </div>
        <div>
          <label htmlFor="">imageAlt</label>
          <input
            type="text"
            placeholder="imagen alternativo"
            name="imageAlt"
            value={product.imageAlt}
            onChange={onChangeInput}
          />
        </div>
        <div>
          <label htmlFor="">Price</label>
          <input
            type="number"
            placeholder="precio del producto"
            name="price"
            value={product.price}
            onChange={onChangeInput}
          />
        </div>
        <div>
          <label htmlFor="">Stock</label>
          <input
            type="number"
            placeholder="stock"
            name="stock"
            value={product.stock}
            onChange={onChangeInput}
          />
        </div>
        <div>
          <label htmlFor="">Brand</label>
          <input
            type="text"
            name="brand"
            value={product.brand}
            onChange={onChangeInput}
          />
        </div>
        <div>
          <label htmlFor="">Category</label>
          <input
            type="text"
            placeholder="categoria"
            name="category"
            value={product.category}
            onChange={onChangeInput}
          />
        </div>
        <div>
          <label htmlFor="">Description</label>
          <input
            type="text"
            placeholder="descripcion del producto"
            name="description"
            value={product.description}
            onChange={onChangeInput}
          />
        </div>
        <div>
          <label htmlFor="">isActive</label>
          <div className="isActive">
            <p
              onClick={() => {
                handleInput(true);
              }}
            >
              Activar
            </p>
            <p
              onClick={() => {
                handleInput(false);
              }}
            >
              Desactivar
            </p>
          </div>
        </div>
        <div className="button-container">
          <button type="submit">Enviar</button>
        </div>
        <div className="button-container">
          <button
            onClick={() => {
              setMod(false);
            }}
          >
            Cancelar
          </button>
        </div>
      </form>
    );
  };
  
  export default FormProduct;