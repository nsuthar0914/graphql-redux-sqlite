import { User, Product } from './database.js';
import productsArray from '../data/products.json';
import { encrypt } from '../constants.js';

User.sync({force: true}).then(() => {
  User.create({
    id: 1,
    name: 'neeraj',
    email: 'n.raj.suthar@gmail.com',
    password: encrypt('password'),
  }).then(user => {
    Product.sync({force: true}).then(() => {
      productsArray.forEach(product => {
        Product.create({
          id: product.id,
          name: product.name,
          description: product.description,
          cost: product.cost,
          quantity: product.quantity,
          image: product.image,
          creator: product.creator || user.id,
          title: product.title,
          text: product.text,
        });
      });
    });
  });
});
