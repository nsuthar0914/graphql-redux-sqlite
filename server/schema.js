import * as _ from 'underscore';

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
import {jwtSecret} from '../constants.js';

const MongoClient = require('mongodb').MongoClient
const assert = require('assert');
let productsCollection;
let usersCollections;

// Standard Connection URL
const url = process.env.MONGO_CONNECTION_STRING;
// Use connect method to connect to the Server
MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  console.log("Connected correctly to mongodb server");

  productsCollection = db.collection('products');
  usersCollections = db.collection('users');

  // db.close();
});

const TokenResponse = new GraphQLObjectType({
  name: 'TokenResponse',
  description: 'Represent the type of a token response',
  fields: () => ({
    email: {type: GraphQLString},
    token: {type: GraphQLString},
  })
});

const User = new GraphQLObjectType({
  name: 'User',
  description: 'Represent the type of a user',
  fields: () => ({
    id: {type: GraphQLString},
    name: {type: GraphQLString},
    email: {type: GraphQLString},
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
    image: {type: GraphQLString}
  })
});

const Query = new GraphQLObjectType({
  name: 'RootQuery',
  fields: {
    products: {
      type: new GraphQLList(Product),
      resolve: function(rootValue, args, info) {
        let fields = {};
        let fieldASTs = info.fieldASTs;
        fieldASTs[0].selectionSet.selections.map(function(selection) {
          fields[selection.name.value] = 1;
        });
        return productsCollection.find({}, fields).toArray();
      }
    },
    product: {
      type: Product, 
      args: { 
        id: { type: GraphQLString}
      },
      resolve: function(rootValue, {id}) {
        console.log(id, 'product')
        return productsCollection.findOne({id});
      }
    },
  }
});

const Mutation = new GraphQLObjectType({
  name: 'Mutations',
  fields: {
    login: {
      type: TokenResponse,
      args: {
        email: {type: GraphQLString}, 
      },
      resolve: function(rootValue, args, info) {
        const token = jwt.sign({
          email: args.email
        }, jwtSecret);
        return {
          email: args.email,
          token
        };
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
      resolve: function(rootValue, args) {
        let product = Object.assign({}, args);
        return productsCollection.count().then(length => {
          console.log('length', length)
          product.id = `${length + 1}`;
          return productsCollection.insert(product)
            .then(_ => product);
        })
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
        let product = Object.assign({}, args);
        return productsCollection.update({id: product.id}, {$set: product})
            .then(_ => product);
      }
    },
    removeProduct: {
      type: new GraphQLList(Product),
      args: {
        id: {type: new GraphQLNonNull(GraphQLString)},
      },
      resolve: function(rootValue, {id}) {
        return productsCollection.remove({id}).then(_ => productsCollection.find().toArray());
      }
    }
  }
});

const Schema = new GraphQLSchema({
  query: Query,
  mutation: Mutation
});

export default Schema;
