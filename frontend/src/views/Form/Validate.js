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

  export default validate;