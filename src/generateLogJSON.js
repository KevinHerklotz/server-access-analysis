'use strict';

const fs = require('fs');
const readline = require('readline');


const file = './log/epa-http.txt';

var lineReader = readline.createInterface({
  input: fs.createReadStream(file)
});

lineReader.on('line', function (line) {
  console.log('Line from file:', line);
});

lineReader.on('close', function () {
  console.log('END');
});