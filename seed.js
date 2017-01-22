require('babel-core/register');
var MongoClient = require('mongodb').MongoClient
  , assert = require('assert');
var url = process.env.MONGO_CONNECTION_STRING;
var productsArray = require('./data/products.json');



MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  createProducts(db, function() {
    db.collection('products').find().toArray().then(col => {
      // console.log(col.length);
      db.collection('products').remove({});
      productsArray.forEach((product, i) => {
        db.collection('products').insert({
          id: product.id,
          name: product.name,
          description: product.description,
          cost: product.cost,
          quantity: product.quantity,
          image: product.image,
          created: new Date(),
          updated: new Date(),
        }, function(err, col) {
          if (i == productsArray.length-1) {
            db.close();
          }
        });
      })
    });
  });
  createUsers(db, function() {});
});

var createProducts = function(db, callback) {
  db.createCollection("products", {strict:true},
    function(err, results) {
      console.log("Products Collection created.");
      callback();
    }
  );
};

var createUsers = function(db, callback) {
  db.createCollection("users", {strict:true},
    function(err, results) {
      console.log("Users Collection created.");
      callback();
    }
  );
}