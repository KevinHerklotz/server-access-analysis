'use strict';
const generateJSONLog = require('./generateJSONLog');

generateJSONLog('./log/__mocks__/epa-http.txt', './dist/log.js')
  .then(() => {
    console.log("SUCCESS")
  })
