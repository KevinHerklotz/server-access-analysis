'use strict';
const generateJSONLog = require('./generateJSONLog');

generateJSONLog('./log/epa-http.txt', './src/dist/log.js')
  .then(() => {
    console.log("SUCCESS")
  })
