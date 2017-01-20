require('babel-core/register');
var express = require('express');
var graphql = require('graphql');
var expressGraphql = require('express-graphql');
var Schema = require('./server/schema.js').default;
var path = require('path');
var http = require('http');
var fs = require('fs');
var webpack = require('webpack');

global.__DEVELOPMENT__ = process.env.NODE_ENV !== 'production';

var app = express();
if (__DEVELOPMENT__) {
  var config = require('./webpack.config');
  var compiler = webpack(config);
  app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
  }));
  app.use(require('webpack-hot-middleware')(compiler));
} else {
  var config = require('./webpack.prod.config');
  var compiler = webpack(config);
}




const client = new http.Server(app);

const index = fs.readFileSync('./index.html', {
  encoding: 'utf-8'
});
const str = index;

app.get('*', function(req, res) {
  res.status(200).send(str);
});

app.get('*', function(req, res) {
  res.status(404).send('Server.js > 404 - Page Not Found');
});

app.use((err, req, res, next) => {
  console.error("Error on request %s %s", req.method, req.url);
  console.error(err.stack);
  res.status(500).send("Server error");
});

process.on('uncaughtException', evt => {
  console.log('uncaughtException ', evt);
});

client.listen('4000', (err) => {
  if (err) {
    console.error(err);
  }
  console.info('==> 💻  Open http://%s:%s in a browser to view the app.', 'localhost', '4000');
});




var server = express();

server.use('/', expressGraphql({
  schema: Schema,
  graphiql: true
}));
server.use('/graphql', expressGraphql({
  schema: Schema,
}));

server.listen(3000);
console.log('GraphQL started on port: 3000');