import React, { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createProduct } from "../../redux/actions/index";
import {
  getBrands,
  getCategories,
  getSubCategories,
} from "../../redux/actions";
import style from "../../views/Form/Form.module.css";
import axios from "axios";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

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
    href: "", //agregado
    imageSrc: "",
    imageAlt: "", //agregado
    price: 0,
    brand: "",
    min: 0, //agregado
    stock: 0,
    category: "",
    subcategory: "",
    tags: "",
    rating: 0,
    description: "",
  });

  const [error, setError] = useState({
    name: "¡Se requiere el nombre!",
    href: "¡Se requiere #!",
    imageSrc: "¡Se requiere la imagen!",
    imageAlt: "¡Se requiere el imageAlt!",
    price: "¡Por favor ingresa un precio válido!",
    brand: "¡Se requiere el brand!",
    min: "¡Se requiere el min!",
    stock: "¡Se requiere el stock!",
    category: "¡Por favor ingresa una category!",
    subcategory: "¡Por favor ingresa una subcategory!",
    tags: "¡Por favor ingresa una tags!",
    rating: "¡Por favor ingresa una rating!",
    description: "¡Por favor ingresa una description!",
  });
  function validate(form) {
    const error = {};
    if (form.name.length < 5) {
      error.name = "¡Ingrese un name valido!";
    }
    if (!form.imageSrc) {
      error.imageSrc = "¡Inserte imagen!";
    }
    if (form.href.length < 1) {
      error.href = "¡Se requiere el href!";
    }

    if (form.imageAlt !== form.name) {
      error.imageAlt = "¡Debe ser igual al name!";
    }
    if (isNaN(form.price) === true || form.price < 1) {
      error.price = "¡Por favor ingresa un precio válido!";
    }
    if (form.brand === "" || form.brand === null) {
      error.brand = "¡Se requiere el brand!";
    }
    if (isNaN(form.min) === true || form.min < 1) {
      error.min = "¡Debe ser un numero mayor a 0!";
    }
    if (isNaN(form.stock) === true || form.stock < 1) {
      error.stock = "¡Debe ser un numero mayor a 0!";
    }
    if (isNaN(form.rating) === true || form.rating < 1) {
      error.rating = "¡Debe ser un numero mayor a 0!";
    }
    if (form.category === "" || form.brand === null) {
      error.category = "¡Por favor ingresa una category!";
    }
    if (form.subcategory === "" || form.subcategory === null) {
      error.subcategory = "¡Por favor ingresa una subcategory!";
    }
    if (form.tags === "" || form.tags === null) {
      error.tags = "¡Por favor ingresa una tags!";
    }
    if (form.description.length < 10) {
      error.description = "¡La descripcion debe ser mas larga!";
    }
    return error;
  }

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
        href: "",
        imageSrc: "",
        imageAlt: "",
        price: "",
        brand: "",
        min: "",
        stock: "",
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
  return (
    <div className={style.form__C}>
      <div className={darkMode ? style.carddarkMode : style.card}>
        <span className={style.card__title} id="title">
          Add your new product
        </span>

        <form onSubmit={(e) => submitHandler(e)} className={style.Formulario}>
          <div className={style.card__form}>
            <label className={style.label__form}>Name: </label>
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

          <div className={style.card__form}>
            <label className={style.label__form}>Price: </label>
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

          <div className={style.card__form}>
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
          )}

          <div className={style.card__form}>
            <label className={style.label__form}>Brand: </label>
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
                placeholder="Add new brand..."
              />
            ) : null}
          </div>
          {newbrand === false ? (
            <div className={style.addBrandCategory} onClick={handleInputBrand}>
              -Click Here to new add Brand-
            </div>
          ) : (
            <div className={style.addBrandCategory} onClick={handleInputBrand2}>
              -Back to Select Brand-
            </div>
          )}
          {error.brand && (
            <strong className={style.card__content}>{error.brand}</strong>
          )}

          <div className={style.card__form}>
            <label className={style.label__form}>Category: </label>
            {newcategory === false ? (
              <select
                className={style.selectBrandCategory}
                onChange={handleSelectCategory}
              >
                <option value="">Category</option>
                {categories.map((category) => (
                  <option value={category}>{category}</option>
                ))}
              </select>
            ) : null}

            {newcategory === true ? (
              <input
                type="text"
                name="category"
                value={form.value}
                onChange={(e) => changeHandler(e)}
                placeholder="Add new Category..."
              />
            ) : null}
          </div>
          {newcategory === false ? (
            <div
              className={style.addBrandCategory}
              onClick={handleInputCategory}
            >
              -Click Here to add new Category-
            </div>
          ) : (
            <div
              className={style.addBrandCategory}
              onClick={handleInputCategory2}
            >
              -Back to Select Category-
            </div>
          )}
          {error.category && (
            <strong className={style.card__content}>{error.category}</strong>
          )}

          <div className={style.card__form}>
            <label className={style.label__form}>SubCategory: </label>
            {newsubcategory === false ? (
              <select
                className={style.selectBrandCategory}
                onChange={handleSelectSubCategory}
              >
                <option value="">SubCategory</option>
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
                placeholder="Add new SubCategory..."
              />
            ) : null}
          </div>
          {!newsubcategory ? (
            <div
              className={style.addBrandCategory}
              onClick={handleInputSubCategory}
            >
              -Click Here to add new SubCategory-
            </div>
          ) : null}
          {error.subcategory && (
            <strong className={style.card__content}>{error.subcategory}</strong>
          )}

          <div className={style.card__form}>
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
          )}

          <div className={style.card__form}>
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
          )}

          <div className={style.card__form}>
            <label className={style.label__form}>Description: </label>
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
          <div className={style.card__form}>
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
          )}

          {/* imageAlt */}
          <div className={style.card__form}>
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
          )}

          {/* min */}
          <div className={style.card__form}>
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
        <button className={style.btn} type="submit" onClick={submitHandler}>
          Create product
        </button>
      </div>
      {/* <div className={style.buttonReturn}>
        <Link to="/admin">
          <button className={style.btnReturn}>Return To Admin</button>
        </Link>
      </div> */}
    </div>
  );
};

export default FormProduct;
