/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Product, conn } = require('../../src/db.js');

const agent = session(app);
const product = {
  name: 'producto',
};

describe('Product routes', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('No se puede conectar a la base de datos:', err);
  }));
  beforeEach(() => Product.sync({ force: true })
    .then(() => Product.create(product)));
  describe('GET /products', () => {
    it('should get 200', () => 
      agent.get('/products/').expect(200)
    );
  });
});
