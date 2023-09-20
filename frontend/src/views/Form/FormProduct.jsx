import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createProduct } from "../../redux/actions/index";
import validate from '../../views/Form/Validate';
import Loading from "../../components/Loading/Loading"; 
import {getBrands, getCategories, getSubCategories} from "../../redux/actions/index";
import style from "../../views/Form/Form.module.css";
import axios from "axios";
import { useHistory, Link } from "react-router-dom";
import Swal from "sweetalert2";

const FormProduct = () => {
  const dispatch = useDispatch();
  const navigate = useHistory()

  useEffect(() => {
    dispatch(getBrands());
    dispatch(getCategories());
    dispatch(getSubCategories());
  }, [dispatch]);

  const [form, setForm] = useState({
    name: "",
    imageSrc: "",
    price: 0,
    stock: 0,
    category: "",
    brand: "",
    subcategory: "",
    description: "",
  });

  const [error, setError] = useState({
    name: "Se requiere el nombre.",
    imageSrc: "Se requiere la imagen.",
    price: "Por favor ingresa un precio válido.",
    stock: "Se requiere el stock.",
    category: "Por favor ingresa una categoría.",
    brand: "Se requiere una marca.",
    subcategory: "Por favor ingresa una subcategoría.",
    description: "Por favor ingresa una descripción.",
  });
 

  // Carga imagen ibb
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    formData.append("key", "1492e57d06d94a35b2f3124b4c2b79a2"); // Replace with your ImgBB API key
    console.log(formData)
    console.log(file)
    try {
      const response = await axios.post("https://api.imgbb.com/1/upload",formData);
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
    } catch (error) {
       console.error("Error uploading image:", error);
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
    setError(validate({
        ...form,
        [event.target.name]: event.target.value,
      })
    );
  };
  console.log(form.imageSrc);

  const submitHandler = (event) => {
    event.preventDefault();
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
        imageSrc: "",
        price: "",
        stock: "",
        category: "",
        brand: "",
        subcategory: "",
        description: "",
      });
      Swal.fire({
        title: "¡Producto creado correctamente!",
        icon: "success",
        confirmButtonText: "Ok",
        confirmButtonColor: "#28a745",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate.push("/admin/productos");
        }
      });
    }
  };

  const brands = useSelector((state) => state.brands);
  const categories = useSelector((state) => state.categories);
  const subcategories = useSelector((state) => state.subcategories);

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
      ) : (<div className={style.form__C}>
         <div className={style.card}>
          <Link to= {"/admin/productos"}><button>volver a la lista</button>
          </Link>
               <h1 className={style.card__title} id="title">Agregar un nuevo Producto</h1>

        <form onSubmit={(e) => submitHandler(e)} className={style.Formulario}>
          <div className={style.card__form}>
            <label className={style.label__form}>Nombre: </label>
            <input type="text" value={form.value} onChange={(e) => changeHandler(e)} name="name" placeholder="Escribe el nombre del producto..."/>
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
            <img src={form.imageSrc} alt="Producto" className={style.uploadedImage}/>
          )}
          {error.imageSrc && (<strong className={style.card__content}>{error.imageSrc}</strong>)}
        
        <br></br>

          <div className={style.card__form3}>
            <label className={style.label__form}>Precio:</label>
            <input type="text" value={form.value} onChange={(e) => changeHandler(e)} name="price" placeholder="Escribe el precio del producto..."/>
          </div>
          {error.price && (
            <strong className={style.card__content}>{error.price}</strong>
          )}

          <div className={style.card__form}>
            <label className={style.label__form}>Stock:</label>
            <input type="text" value={form.value} onChange={(e) => changeHandler(e)} name="stock" placeholder="Ingresa el stock del producto..."/>
          </div>
          {error.stock && (
            <strong className={style.card__content}>{error.stock}</strong>
          )}

        <br></br>

          <div className={style.card__form}>
            <label className={style.label__form}>Marca:</label>
           
              <select className={style.selectBrandCategory} onChange={handleSelectBrand}>
                <option value="">Selecciona una marca</option>
                {brands.length > 0 &&
                  brands.map((brand) => (
                    <option key={brand.id} value={brand.name}>
                      {brand.name}
                    </option>
                  ))}
              </select>
          </div>
          {error.brand && (
            <strong className={style.card__content}>{error.brand}</strong>
          )}

        <br></br>

          <div className={style.card__form}>
            <label className={style.label__form}>Categoría: </label>
              <select className={style.selectBrandCategory} onChange={handleSelectCategory}>
                <option value="">Selecciona una categoría</option>
                 <option value="">Category</option>
                {categories.map((category) => (
                  <option value={category}>{category}</option>
                ))}
              </select>
          </div> 
          {error.category && (
            <strong className={style.card__content}>{error.category}</strong>
          )}

        <br></br>

          <div className={style.card__form}>
            <label className={style.label__form}>SubCategoría: </label>
              <select className={style.selectBrandCategory} onChange={handleSelectSubCategory}>
                <option value="">Seleccione una subcategoría</option>
                {subcategories.map((subcategory) => (
                  <option value={subcategory}>{subcategory}</option>
                ))}
              </select>
          </div>
          {error.subcategory && (
            <strong className={style.card__content}>{error.subcategory}</strong>
          )}

        <br></br>

          <div className={style.card__form2}>
            <label className={style.label__form}>Descripción: </label>
            <input type="text" value={form.value} onChange={(e) => changeHandler(e)} name="description" placeholder="Escribe la descripción del producto..."/>
          </div>
          {error.description && (
            <strong className={style.card__content}>{error.description}</strong>
          )}

        <br></br>     
        <button className={style.btn} type="submit">Crear producto</button>
        </form>
        <br></br>
      </div>
      <br></br>
    </div>
  )}
</>
)
};


export default FormProduct;
