'use strict';
const fs = require('fs');
const readline = require('readline');
var mkdirp = require('mkdirp');
const parseLineToJSON = require('./parseLineToJSON');

const generateJSONLog = (sourcePath, destinationPath) => {
  // remove file name to get destination path
  const destinationFolder = destinationPath.substring(0, destinationPath.lastIndexOf('/'));
  // Create destination folder if it doesn't exist
  mkdirp(destinationFolder, function (err) {
    if (err) {
      console.error(`Error: Couldn't create folder "${destinationFolder}"`, err)
    }
  });

  // create ReadStream
  const lineReader = readline.createInterface({
    input: fs.createReadStream(sourcePath, 'UTF-8')
  });

  // Array that will contain all the JSON objects
  const LogJSONArray = [];

  // for each read line...
  lineReader.on('line', function (line) {
    // ... generate JSON and add to array
    LogJSONArray.push(parseLineToJSON(line));
  });

  // when finished with reading the file...
  lineReader.on('close', function () {
    const content = JSON.stringify(LogJSONArray);
    // ... write array into file
    fs.writeFile(destinationPath, content, 'utf8', (err) => {
        if (err) {
          return console.log(err);
        }

        console.log(`The JSON array was successfully geneated and saved in ${destinationPath}`);
    });
  });

}

module.exports = generateJSONLog;
