import Sequelize from 'sequelize';

const db = new Sequelize('gQLrdxtaskdb', null, null, {
  dialect: 'sqlite',
  storage: './gQLrdxtaskdb.sqlite',
});

const UserModel = db.define('user', {
  id: { type: Sequelize.INTEGER, primaryKey: true},
  name: { type: Sequelize.STRING },
  email: { type: Sequelize.STRING },
  password: { type: Sequelize.STRING },
});

const ProductModel = db.define('product', {
  id: { type: Sequelize.INTEGER, primaryKey: true},
  name: { type: Sequelize.STRING },
  description: { type: Sequelize.STRING },
  cost: { type: Sequelize.INTEGER },
  quantity: { type: Sequelize.INTEGER },
  image: { type: Sequelize.STRING },
  creator: { type: Sequelize.INTEGER },
  title: { type: Sequelize.STRING },
  text: { type: Sequelize.STRING },
});

ProductModel.belongsTo(UserModel, {foreignKey: 'creator', targetKey: 'id'});

const User = db.models.user;
const Product = db.models.product;

export { User, Product };