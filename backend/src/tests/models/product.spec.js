const { Product, conn } = require('../../src/db.js');
const { expect } = require('chai');

describe('User model', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('No se puede conectar a la base de datos:', err);
    }));
  describe('Validators', () => {
    beforeEach(() => Product.sync({ force: true }));
    describe('name', () => {
      it('debería arrojar un error si el nombre es nulo', (done) => {
        Product.create({
        })
          .then(() => done(new Error('Requiere un nombre válido')))
          .catch(() => done());
      });
      it('debería funcionar cuando es un nombre válido', () => {
        Product.create({ name: 'Producto' });
      });
    });
  });
});

