

'use strict';

var path = require('path');
var express = require('express');
var config = require('./config');

var app = express();

app.disable('etag');
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.set('trust proxy', true);


var model = require('./items/model-' + config.dataBackend)(config);
app.use('/items', require('./items/crud')(model));
app.use('/api/items', require('./items/api')(model));


app.get('/', function(req, res) {
  res.redirect('/items');
});


// Basic error handler
app.use(function(err, req, res, next) {
  /* jshint unused:false */
  console.error(err.stack);
  res.status(500).send('Something broke!');
});


// Start the server
var server = app.listen(config.port, function () {
  var host = "localhost";
  var port = server.address().port;

  console.log('App listening at http://%s:%s', host, port);
});
