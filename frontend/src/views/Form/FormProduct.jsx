import React, { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createProduct } from "../../redux/actions/index";
import validate from '../../views/Form/Validate';
import Loading from "../../components/Loading/Loading"; 

import {
  getBrands,
  getCategories,
  getSubCategories,
} from "../../redux/actions/index";
import style from "../../views/Form/Form.module.css";
import axios from "axios";
import Swal from "sweetalert2";
//import { Link } from "react-router-dom";

const FormProduct = () => {
  const dispatch = useDispatch();
  //let navigate = useNavigate();
  const darkMode = useSelector((state) => state.darkMode); // Agrega esta línea

  useEffect(() => {
    dispatch(getBrands());
    dispatch(getCategories());
    dispatch(getSubCategories());
  }, [dispatch]);

  const [form, setForm] = useState({
    name: "",
    // href: "", //agregado
    imageSrc: "",
    // imageAlt: "", //agregado
    price: 0,
    brand: "",
    min: 0, //agregado
    // stock: 0,
    category: "",
    subcategory: "",
    // tags: "",
    // rating: 0,
    description: "",
  });

  const [error, setError] = useState({
    name: "¡Se requiere el nombre!",
    // href: "¡Se requiere #!",
    imageSrc: "¡Se requiere la imagen!",
    // imageAlt: "¡Se requiere el imageAlt!",
    price: "¡Por favor ingresa un precio válido!",
    brand: "¡Se requiere una marca!",
    min: "¡Se requiere el min!",
    // stock: "¡Se requiere el stock!",
    category: "¡Por favor ingresa una categoría!",
    subcategory: "¡Por favor ingresa una subcategoría!",
    // tags: "¡Por favor ingresa una tags!",
    // rating: "¡Por favor ingresa una rating!",
    description: "¡Por favor ingresa una descripción!",
  });
 

  // Carga imagen ibb
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    formData.append("key", "1492e57d06d94a35b2f3124b4c2b79a2"); // Replace with your ImgBB API key

    try {
      const response = await axios.post(
        "https://api.imgbb.com/1/upload",
        formData
      );
      const imageUrl = response.data.data.url;
      console.log(imageUrl);
      setForm({
        ...form,
        imageSrc: imageUrl,
      });
      setError(
        validate({
          ...form,
          imageSrc: imageUrl,
        })
      );
      //setImageSrcError(""); // Clear the imageSrc error if any
    } catch (error) {
      // console.error("Error uploading image:", error);
      //setImageSrcError("Failed to upload image. Please try again.");
    }
  };

  // funcion select brand
  const handleSelectBrand = (event) => {
    setForm({
      ...form,
      brand: event.target.value,
    });
    setError(
      validate({
        ...form,
        brand: event.target.value,
      })
    );
  };

  // funcion select category
  const handleSelectCategory = (event) => {
    setForm({
      ...form,
      category: event.target.value,
    });
    setError(
      validate({
        ...form,
        category: event.target.value,
      })
    );
  };

  // funcion select Subcategory
  const handleSelectSubCategory = (event) => {
    setForm({
      ...form,
      subcategory: event.target.value,
    });
    setError(
      validate({
        ...form,
        subcategory: event.target.value,
      })
    );
  };

  const changeHandler = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
    setError(
      validate({
        ...form,
        [event.target.name]: event.target.value,
      })
    );
  };
  console.log(form.imageSrc);

  const submitHandler = (event) => {
    if (Object.values(error).some((value) => value !== "")) {
      Swal.fire({
        title: "¡No se pudo crear el producto!",
        text: "Por favor llene las casillas vacias o revise sus errores",
        icon: "warning",
        confirmButtonText: "Ok",
      });
    } else {
      dispatch(createProduct(form));
      setForm({
        name: "",
        // href: "",
        imageSrc: "",
        // imageAlt: "",
        price: "",
        brand: "",
        min: "",
        // stock: "",
        category: "",
        description: "",
      });

      Swal.fire({
        title: "¡Producto creado correctamente!",
        icon: "success",
        confirmButtonText: "Ok",
        confirmButtonColor: "#28a745",
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.reload();
        }
      });
    }
  };

  const brands = useSelector((state) => state.brands);
  const categories = useSelector((state) => state.categories);
  const subcategories = useSelector((state) => state.subcategories);

  const [newbrand, setNewbrand] = useState(false);
  const [newcategory, setNewCategory] = useState(false);
  const [newsubcategory, setNewSubcategory] = useState(false);

  const handleInputBrand = () => {
    setNewbrand(true);
  };

  const handleInputBrand2 = () => {
    setNewbrand(false);
  };

  const handleInputCategory = () => {
    setNewCategory(true);
  };

  const handleInputSubCategory = () => {
    setNewSubcategory(true);
  };

  const handleInputCategory2 = () => {
    setNewCategory(false);
  };

  const handleInputSubCategory2 = () => {
    setNewSubcategory(false);
  };
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Establecer isLoading en falso después de 2 segundos
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {isLoading ? (
        <div className={style.loadingContainer}>
          <Loading />
        </div>
      ) : (
    <div className={style.form__C}>
      <div className={darkMode ? style.carddarkMode : style.card}>
        <span className={style.card__title} id="title">
          Agregar un nuevo Producto
        </span>

        <form onSubmit={(e) => submitHandler(e)} className={style.Formulario}>
          <div className={style.card__form}>
            <label className={style.label__form}>Nombre: </label>
            <input
              type="text"
              value={form.value}
              onChange={(e) => changeHandler(e)}
              name="name"
              placeholder="Escribe el nombre del producto..."
            />
          </div>
          {error.name && (
            <strong className={style.card__content}>{error.name}</strong>
          )}

        <br></br>
          <div className={style.imgCont}>
            <label className={style.label__form}>Imagen del producto: </label>

            <input
              type="file" // Cambia el tipo de entrada a "file" para permitir la selección de imágenes
              onChange={(e) => handleImageUpload(e)} // Llama a la función handleImageUpload cuando cambie la imagen
              name="imageSrc"
              accept="image/*" // Restringe la selección de archivos a imágenes solamente
            />
          </div>
          {form.imageSrc && (
            <img
              src={form.imageSrc}
              alt="Producto"
              className={style.uploadedImage}
            />
          )}
          {error.imageSrc && (
            <strong className={style.card__content}>{error.imageSrc}</strong>
          )}

        <br></br>
          <div className={style.card__form3}>
            <label className={style.label__form}>Precio: </label>
            <input
              type="text"
              value={form.value}
              onChange={(e) => changeHandler(e)}
              name="price"
              placeholder="Escribe el precio del producto..."
            />
          </div>
          {error.price && (
            <strong className={style.card__content}>{error.price}</strong>
          )}

          {/* <div className={style.card__form}>
            <label className={style.label__form}>Stock: </label>
            <input
              type="text"
              value={form.value}
              onChange={(e) => changeHandler(e)}
              name="stock"
              placeholder="Ingresa el stock del producto..."
            />
          </div>
          {error.stock && (
            <strong className={style.card__content}>{error.stock}</strong>
          )} */}

        <br></br>
          <div className={style.card__form}>
            <label className={style.label__form}>Marca: </label>
            {newbrand === false ? (
              <select
                className={style.selectBrandCategory}
                onChange={handleSelectBrand}
              >
                <option value="">Selecciona una marca</option>
                {brands.length > 0 &&
                  brands.map((brand) => (
                    <option key={brand.id} value={brand.name}>
                      {brand.name}
                    </option>
                  ))}
              </select>
            ) : null}
            {newbrand === true ? (
              <input
                type="text"
                name="brand"
                value={form.value}
                onChange={(e) => changeHandler(e)}
                placeholder="Agregar una nueva marca..."
              />
            ) : null}
          </div>
          {newbrand === false ? (
            <div className={style.addBrandCategory} onClick={handleInputBrand}>
              -Haga clic aquí para agregar una nueva marca-
            </div>
          ) : (
            <div className={style.addBrandCategory} onClick={handleInputBrand2}>
              -Volver a Seleccionar una Marca-
            </div>
          )}
          {error.brand && (
            <strong className={style.card__content}>{error.brand}</strong>
          )}

        <br></br>
          <div className={style.card__form}>
            <label className={style.label__form}>Categoría: </label>
            {newcategory === false ? (
              <select
                className={style.selectBrandCategory}
                onChange={handleSelectCategory}
              >
                <option value="">Selecciona una categoría</option>
                {/* <option value="">Category</option>
                {categories.map((category) => (
                  <option value={category}>{category}</option>
                ))} */}
              </select>
            ) : null}
            
            {newcategory === true ? (
              <input
                type="text"
                name="category"
                value={form.value}
                onChange={(e) => changeHandler(e)}
                placeholder="Agregar nueva categoría..."
              />
            ) : null}
          </div>
          {newcategory === false ? (
            <div
              className={style.addBrandCategory}
              onClick={handleInputCategory}
            >
              -Haga clic aquí para agregar una nueva categoría-
            </div>
          ) : (
            <div
              className={style.addBrandCategory}
              onClick={handleInputCategory2}
            >
              -Volver a Seleccionar Categoría-
            </div>
          )}
          {error.category && (
            <strong className={style.card__content}>{error.category}</strong>
          )}

        <br></br>
          <div className={style.card__form}>
            <label className={style.label__form}>SubCategoría: </label>
            {newsubcategory === false ? (
              <select
                className={style.selectBrandCategory}
                onChange={handleSelectSubCategory}
              >
                <option value="">Seleccione una subcategoría</option>
                {subcategories.map((subcategory) => (
                  <option value={subcategory}>{subcategory}</option>
                ))}
              </select>
            ) : null}
    
            {newsubcategory === true ? (
              <input
                type="text"
                name="subcategory"
                value={form.value}
                onChange={(e) => changeHandler(e)}
                placeholder="Agregar nueva subcategoría..."
              />
            ) : null}
          </div>
          {!newsubcategory ? (
            <div
              className={style.addBrandCategory}
              onClick={handleInputSubCategory}
            >
              -Haga clic aquí para agregar una nueva subcategoría-
            </div>
          ) : null}
          {error.subcategory && (
            <strong className={style.card__content}>{error.subcategory}</strong>
          )}

          {/* <div className={style.card__form}>
            <label className={style.label__form}>Tags: </label>
            <input
              type="text"
              value={form.value}
              onChange={(e) => changeHandler(e)}
              name="tags"
              placeholder="Escribe la tags del producto..."
            />
          </div>
          {error.tags && (
            <strong className={style.card__content}>{error.tags}</strong>
          )} */}

          {/* <div className={style.card__form}>
            <label className={style.label__form}>Rating: </label>
            <input
              type="text"
              value={form.value}
              onChange={(e) => changeHandler(e)}
              name="rating"
              placeholder="Escribe la rating del producto..."
            />
          </div>
          {error.rating && (
            <strong className={style.card__content}>{error.rating}</strong>
          )} */}

        <br></br>
          <div className={style.card__form2}>
            <label className={style.label__form}>Descripción: </label>
            <input
              type="text"
              value={form.value}
              onChange={(e) => changeHandler(e)}
              name="description"
              placeholder="Escribe la descripción del producto..."
            />
          </div>
          {error.description && (
            <strong className={style.card__content}>{error.description}</strong>
          )}

          {/* ACA VAN LAS 3 PROPIEDADES FALTANTES  */}

          {/* HREF */}
          {/* <div className={style.card__form}>
            <label className={style.label__form}>Href: </label>
            <input
              type="text"
              value={form.value}
              onChange={(e) => changeHandler(e)}
              name="href"
              placeholder="Escribe el href del producto..."
            />
          </div>
          {error.href && (
            <strong className={style.card__content}>{error.href}</strong>
          )} */}

          {/* imageAlt */}
          {/* <div className={style.card__form}>
            <label className={style.label__form}>ImageAlt: </label>
            <input
              type="text"
              value={form.value}
              onChange={(e) => changeHandler(e)}
              name="imageAlt"
              placeholder="Escribe el imageAlt del producto..."
            />
          </div>
          {error.imageAlt && (
            <strong className={style.card__content}>{error.imageAlt}</strong>
          )} */}

        <br></br>
          {/* min */}
          <div className={style.card__form1}>
            <label className={style.label__form}>Min: </label>
            <input
              type="text"
              value={form.value}
              onChange={(e) => changeHandler(e)}
              name="min"
              placeholder="Ingresa el Min del producto..."
            />
          </div>
          {error.min && (
            <strong className={style.card__content}>{error.min}</strong>
          )}
        </form>
        <br></br>
        <button className={style.btn} type="submit" onClick={submitHandler}>
        Crear producto
        </button>
      </div>
      {/* <div className={style.buttonReturn}>
        <Link to="/admin">
          <button className={style.btnReturn}>Return To Admin</button>
        </Link>
      </div> */}

      <br></br>
    </div>
  )}
</>
)
};


export default FormProduct;
