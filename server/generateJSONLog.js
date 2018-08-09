'use strict';
const fs = require('fs');
const readline = require('readline');

const generateJSONLog = (sourceLocation, destination) => {
  var lineReader = readline.createInterface({
    input: fs.createReadStream(sourceLocation, 'UTF-8')
  });

  lineReader.on('line', function (line) {
    console.log('Line from file:', line);
  });

  lineReader.on('close', function () {
    console.log('END');
  });
}

module.exports = generateJSONLog;
