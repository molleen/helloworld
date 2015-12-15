

'use strict';

var express = require('express');
var bodyParser = require('body-parser');


module.exports = function(model) {

  var router = express.Router();

  router.use(bodyParser.urlencoded({extended: false}));


  function handleRpcError(err, res) {
    res.status(err.code || 500).send(err.message);
  }


  router.use(function(req, res, next){
    res.set('Content-Type', 'text/html');
    next();
  });


  router.get('/', function list(req, res) {
    model.list(15, req.query.pageToken,
      function(err, entities, cursor) {
        if (err) { return handleRpcError(err, res); }
        res.render('items/list.jade', {
          items: entities,
          nextPageToken: cursor
        });
      }
    );
  });

  router.get('/:item', function get(req, res) {
      model.read(req.params.book, function(err, entity) {
        if (err) { return handleRpcError(err, res); }
        res.render('items/view.jade', {
          item: entity
        });
      });
    });



  router.post('/', function insert(req, res) {
    var data = req.body;
    // Save the data to the database.
    model.create(data, function(err, savedData) {
      if (err) { return handleRpcError(err, res); }
      res.redirect(req.baseUrl);
    });
  });

  return router;

};
