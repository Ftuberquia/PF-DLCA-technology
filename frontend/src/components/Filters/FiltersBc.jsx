
// async function ProductsByBrand(brand, order) {
//     try {
//       const response = await axios.get(`/api/products/filterByBrand`, {
//         params: { brand, order },
//       });
  
//       // Verifica el estado de la respuesta
//       if (response.status !== 200) {
//         throw new Error('Error al obtener productos');
//       }
  
//       const data = response.data;
//       // Aquí tienes los productos filtrados que recibiste del backend
//       console.log(data);
//       // Aplica estos productos en tu página de productos
//       renderProducts(data);
//     } catch (error) {
//       console.error('Error al obtener productos:', error);
//     }
//   }
  
//   // Llamada a la función para obtener productos filtrados
//   const brandFilter = 'name'; // Reemplaza con la marca que desees filtrar
//   const orderFilter = 'ASC'; // Reemplaza con el orden deseado
//   ProductsByBrand(brandFilter, orderFilter);