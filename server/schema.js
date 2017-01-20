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

const MongoClient = require('mongodb').MongoClient
const assert = require('assert');
let productsCollection;

// Standard Connection URL
const url = process.env.MONGO_CONNECTION_STRING;
// Use connect method to connect to the Server
MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  console.log("Connected correctly to mongodb server");

  productsCollection = db.collection('products');

  // db.close();
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
    }
  }
});

const Schema = new GraphQLSchema({
  query: Query,
  mutation: Mutation
});

export default Schema;
