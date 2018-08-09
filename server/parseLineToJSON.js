'use strict';


const parseLineToJSON = logLine => {
  // remove quotation marks and square brackets
  logLine = logLine.replace(/\"|\[|\]/g, '');

  // replace colons with space (to split it up easier later)
  logLine = logLine.replace(/\:/g, ' ');

  // split string up into array
  const logArray = logLine.split(' ');

  // generate object
  const JSONObject = {
    'host': logArray[0],
    'datetime': {
      'day': logArray[1],
      'hour': logArray[2],
      'minute': logArray[3],
      'second': logArray[4]
    },
    'request': {
      'method': logArray[5],
      'url': logArray[6],
      'protocol': logArray[7].split('/')[0],
      'protocol_version': logArray[7].split('/')[1]
    },
    'response_code': logArray[8],
    'document_size': logArray[9]
  };

  return JSONObject;

};

module.exports = parseLineToJSON;
