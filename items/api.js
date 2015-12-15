
'use strict';

var express = require('express');
var bodyParser = require('body-parser');


module.exports = function(model) {

  var router = express.Router();

  router.use(bodyParser.json());


  function handleRpcError(err, res) {
    if (err.code === 404) { return res.status(404); }
    res.status(500).json({
      message: err.message,
      internalCode: err.code
    });
  }


  router.get('/', function list(req, res) {
    model.list(10, req.query.pageToken,
      function(err, entities, cursor) {
        if (err) { return handleRpcError(err, res); }
        res.json({
          items: entities,
          nextPageToken: cursor
        });
      });
  });


  router.post('/', function insert(req, res) {
    model.create(req.body, function(err, entity) {
      if (err) { return handleRpcError(err, res); }
      res.json(entity);
    });
  });

  return router;

};
