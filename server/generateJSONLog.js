'use strict';
const fs = require('fs');
const readline = require('readline');
const parseLineToJSON = require('./parseLineToJSON');

const generateJSONLog = (sourceLocation, destinationLocation) => {
  const lineReader = readline.createInterface({
    input: fs.createReadStream(sourceLocation, 'UTF-8')
  });

  const LogJSONArray = [];

  lineReader.on('line', function (line) {
    LogJSONArray.push(parseLineToJSON(line));
  });

  lineReader.on('close', function () {
    const content = JSON.stringify(LogJSONArray);

    fs.writeFile(destinationLocation, content, 'utf8', (err) => {
        if (err) {
          return console.log(err);
        }

        console.log(`The JSON array was successfully geneated and saved in ${destinationLocation}`);
    });
  });

}

module.exports = generateJSONLog;
