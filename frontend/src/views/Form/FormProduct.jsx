const FormProduct = () => {
  //console.log(product);
  return (
    <form action="" className="formulario" >
      <div>
        <label htmlFor="">Name</label>
        <input
          type="text"
          // placeholder="nombre del producto"
          name="name"
        />
      </div>
    </form>
  );
};

export default FormProduct;
