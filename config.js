
'use strict';


module.exports = {
  port: process.env.PORT || 8080,
  dataBackend: 'mongodb',

  gcloud: {
    projectId: 'gentle-broker-115413'
  },


  mongodb: {
    url: 'mongodb://localhost:27017/moj',
    collection: 'items'
  }
};
