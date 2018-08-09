'use strict';
const fs = require('fs');
const readline = require('readline');
var mkdirp = require('mkdirp');
const parseLineToJSON = require('./parseLineToJSON');

const generateJSONLog = (sourcePath, destinationPath) => {
  // throw new Error('ASD', 'aaaa');

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

  console.log('Reading log file...')

  // Array that will contain all the JSON objects
  const LogJSONArray = [];

  // for each read line...
  lineReader.on('line', function (line) {
    // ... generate JSON and add to array
    LogJSONArray.push(parseLineToJSON(line));
  });

  // when finished with reading the file...
  lineReader.on('close', function () {
    console.log('Writing log file...')

    const content = `export default ${JSON.stringify(LogJSONArray)}\;`;
    // ... write array into file
    // (I didn't use NodeJS' writeStream, because it would have to many write accesses to the file which would be slow on a hard drive - collecting the data in an array first will be executed on the RAM and will be much faster. Should only be changed if log files get as big as available RAM)
    fs.writeFile(destinationPath, content, 'utf8', (err) => {
        if (err) {
          return console.log(err);
        }

        console.log(`The JSON array was successfully geneated and saved in ${destinationPath}`);
        return true;
    });
  });

}

module.exports = generateJSONLog;
