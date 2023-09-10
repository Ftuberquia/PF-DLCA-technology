const { expect } = require('chai');
const validateProductsData = require('./validateProductsData');

describe('validateProductsData', () => {
    it('should throw an error if productsData is not an object', () => {
      const productsData = 'not an object';
  
      expect(() => validateProductsData(productsData)).to.throw('Los datos de productos deben ser un objeto JSON.');
    });
  
    it('should throw an error if productsData does not have a "products" property', () => {
      const productsData = {};
  
      expect(() => validateProductsData(productsData)).to.throw('Los datos de productos deben tener una propiedad "products" con un array de objetos.');
    });
  
    it('should throw an error if any product does not have a "name" field', () => {
      const productsData = {
        products: [
          { price: 10 },
          { name: 'Product 2', price: 20 },
        ],
      };
  
      expect(() => validateProductsData(productsData)).to.throw('Cada producto debe tener un campo "name" con una cadena de caracteres.');
    });
  
    it('should throw an error if any product does not have a "price" field', () => {
      const productsData = {
        products: [
          { name: 'Product 1' },
          { name: 'Product 2', price: 20 },
        ],
      };
  
      expect(() => validateProductsData(productsData)).to.throw('Cada producto debe tener un campo "price" con un número.');
    });
  
    it('should not throw an error if productsData is valid', () => {
      const productsData = {
        products: [
          { name: 'Product 1', price: 10 },
          { name: 'Product 2', price: 20 },
        ],
      };
  
      expect(() => validateProductsData(productsData)).not.to.throw();
    });
  });

// // Función para validar los datos de productos
// function validateProductsData(productsData) {
//     // Validar que los datos sean un objeto
//     if (!productsData || typeof productsData !== 'object') {
//       throw new Error('Los datos de productos deben ser un objeto JSON.');
//     }
  
//     // Validar que los datos tengan la estructura esperada
//     if (!productsData.products || typeof productsData.products !== 'array') {
//       throw new Error('Los datos de productos deben tener una propiedad "products" con un array de objetos.');
//     }
  
//     // Validar que cada producto tenga los campos esperados
//     for (const product of productsData.products) {
//       if (!product.name || typeof product.name !== 'string') {
//         throw new Error('Cada producto debe tener un campo "name" con una cadena de caracteres.');
//       }
//       if (!product.price || typeof product.price !== 'number') {
//         throw new Error('Cada producto debe tener un campo "price" con un número.');
//       }
//     }
//   }