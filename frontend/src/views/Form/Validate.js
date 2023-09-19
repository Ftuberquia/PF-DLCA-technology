function validate(form) {
    const error = {};
    if (form.name.length < 5) {
      error.name = "¡Ingrese un name valido!";
    }
    // if (!form.imageSrc) {
    //   error.imageSrc = "¡Inserte imagen!";
    // }
    if (isNaN(form.price) === true || form.price < 1) {
      error.price = "¡Por favor ingresa un precio válido!";
    }
    if (form.brand === "" || form.brand === null) {
      error.brand = "¡Se requiere el brand!";
    }
    if (isNaN(form.stock) === true || form.stock < 1) {
      error.stock = "¡Debe ser un numero mayor a 0!";
    }
    if (form.category === "" || form.brand === null) {
      error.category = "¡Por favor ingresa una category!";
    }
    if (form.subcategory === "" || form.subcategory === null) {
      error.subcategory = "¡Por favor ingresa una subcategory!";
    }
    if (form.description.length < 10) {
      error.description = "¡La descripcion debe ser mas larga!";
    }
    return error;
  }

  export default validate;