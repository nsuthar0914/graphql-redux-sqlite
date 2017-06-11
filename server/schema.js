import * as _ from 'underscore';
import { User as UserModel, Product as ProductModel } from './database.js';
import {
  GraphQLList,
  GraphQLObjectType,
  GraphQLInterfaceType,
  GraphQLSchema,
  GraphQLString,
  GraphQLInt,
  GraphQLFloat,
  GraphQLEnumType,
  GraphQLNonNull
} from 'graphql';
import jwt from 'jsonwebtoken';
import {jwtSecret, encrypt, decrypt} from '../constants.js';

const getTokenFromUser = function(user) {
  if (!user) return null;
  return jwt.sign({
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
    }
  }, jwtSecret);
}

const createUser = function({name, email, password}) {
  console.log(name, email, password);
  return UserModel.findOne({ where: {email} }).then((userExists) => {
    if (userExists) return userExists;
    return UserModel.count().then(length => {
      let user = {
        name,
        email,
        password
      }
      user.id = `${length + 1}`;
      return UserModel.findOrCreate({where: user})
        .then(_ => user);
    })
  })
}

const findUserByEmail = function ({email, password}) {
  return UserModel.findOne({ where: {email} }).then((userExists) => {
    if (!userExists) return null;
    if (decrypt(userExists.password) === password) {
      return userExists;
    } else {
      return null;
    }
  });
}

const findUserById = function ({id}) {
  return UserModel.findOne({ where: {id} }).then((userExists) => {
    return userExists;
  });
}

const User = new GraphQLObjectType({
  name: 'User',
  description: 'Represent the type of a user',
  fields: () => ({
    id: {type: GraphQLString},
    name: {type: GraphQLString},
    email: {type: GraphQLString},
  })
});

const TokenResponse = new GraphQLObjectType({
  name: 'TokenResponse',
  description: 'Represent the type of a token response',
  fields: () => ({
    token: {type: GraphQLString},
    user: {type: User},
  })
});

const Product = new GraphQLObjectType({
  name: 'Product',
  description: 'Represent the type of a Product',
  fields: () => ({
    id: {type: GraphQLString},
    name: {type: GraphQLString},
    description: {type: GraphQLString},
    cost: {type: GraphQLInt},
    quantity: {type: GraphQLInt},
    image: {type: GraphQLString},
    creator: {
      type: User,
      resolve: function(obj, args) {
        return findUserById({id: obj.creator});
      }
    }
  })
});

const Query = new GraphQLObjectType({
  name: 'RootQuery',
  fields: {
    products: {
      type: new GraphQLList(Product),
      resolve: function(rootValue, args, info) {
        // console.log(rootValue.user);
        let fields = [];
        let fieldASTs = info.fieldASTs;
        fieldASTs[0].selectionSet.selections.map(function(selection) {
          fields.push(selection.name.value);
        });
        return ProductModel.findAll();
      }
    },
    product: {
      type: Product, 
      args: { 
        id: { type: GraphQLString}
      },
      resolve: function(rootValue, {id}) {
        console.log(id, 'product')
        return ProductModel.findOne({ where: {id} });
      }
    },
  }
});

const Mutation = new GraphQLObjectType({
  name: 'Mutations',
  fields: {
    signup: {
      type: TokenResponse,
      args: {
        name: {type: GraphQLString},
        email: {type: new GraphQLNonNull(GraphQLString)}, 
        password: {type: new GraphQLNonNull(GraphQLString)}, 
      },
      resolve: function(rootValue, args, info) {
        args.password = encrypt(args.password);
        return createUser(args).then(user => {
          console.log(user)
          delete user.password
          return {
            user,
            token: getTokenFromUser(user)
          };
        });
      }
    },
    login: {
      type: TokenResponse,
      args: {
        email: {type: new GraphQLNonNull(GraphQLString)}, 
        password: {type: new GraphQLNonNull(GraphQLString)}, 
      },
      resolve: function(rootValue, args, info) {
        return findUserByEmail(args).then(user => {
          console.log(user);
          delete user.password
          return {
            user,
            token: getTokenFromUser(user)
          };
        });
      }
    },
    addProduct: {
      type: Product,
      args: {
        name: {type: new GraphQLNonNull(GraphQLString)},
        description: {type: GraphQLString},
        image: {type: GraphQLString},
        cost: {type: GraphQLInt},
        quantity: {type: GraphQLInt}
      },
      resolve: function(rootValue, args, info, request) {
        let product = Object.assign({}, args);
        if (rootValue.user.user.id) {
          return ProductModel.count().then(length => {
            console.log('length', length)
            product.id = `${length + 1}`;
            product.creator = rootValue.user.user.id;
            return ProductModel.findOrCreate({where: product})
              .then(_ => product);
          })
        } else {
          return null;
        }
      }
    },
    editProduct: {
      type: Product,
      args: {
        id: {type: new GraphQLNonNull(GraphQLString)},
        name: {type: new GraphQLNonNull(GraphQLString)},
        description: {type: GraphQLString},
        image: {type: GraphQLString},
        cost: {type: GraphQLInt},
        quantity: {type: GraphQLInt}
      },
      resolve: function(rootValue, args) {
        return ProductModel.findOne({ where: {id: args.id} }).then(product => {
          if (rootValue.user.user.id && rootValue.user.user.id == product.creator) {
            return ProductModel.update(args, {where: {id: args.id}})
              .then(_ => args);
          } else {
            return null;
          }
        })
      }
    },
    removeProduct: {
      type: new GraphQLList(Product),
      args: {
        id: {type: new GraphQLNonNull(GraphQLString)},
      },
      resolve: function(rootValue, {id}) {
        return ProductModel.findOne({ where: {id} }).then(product => {
          if (rootValue.user.user.id && rootValue.user.user.id == product.creator) {
            return ProductModel.destroy({where: {id}}).then(_ => ProductModel.find().toArray());
          } else {
            return null
          }
        })
      }
    }
  }
});

const Schema = new GraphQLSchema({
  query: Query,
  mutation: Mutation
});

export default Schema;
