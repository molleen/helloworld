// Copyright 2015, Google, Inc.
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//    http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

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
    model.list(10, req.query.pageToken,
      function(err, entities, cursor) {
        if (err) { return handleRpcError(err, res); }
        res.render('items/list.jade', {
          items: entities,
          nextPageToken: cursor
        });
      }
    );
  });


  router.get('/add', function addForm(req, res) {
    res.render('items/form.jade', {
      item: {},
      action: 'Add'
    });
  });


  router.post('/', function insert(req, res) {
    var data = req.body;

    // Save the data to the database.
    model.create(data, function(err, savedData) {
      if (err) { return handleRpcError(err, res); }
      res.redirect(req.baseUrl + '/' + savedData.id);
    });
  });

  return router;

};
