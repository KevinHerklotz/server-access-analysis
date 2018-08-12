'use strict';


const parseLineToJSON = logLine => {


  // will look like "141.243.1.172 [29:23:53:25]"
  let hostAndTime = logLine.slice(0, logLine.indexOf('"') - 1);
  // after both replaces it will look like "141.243.1.172 29 23 53 25"
  hostAndTime = hostAndTime.replace(/\:/g, ' ');
  hostAndTime = hostAndTime.replace(/\[|\]/g, '');
  // split string up into array
  hostAndTime = hostAndTime.split(' ');

  // will look like "GET /Software.html HTTP/1.0"
  let request = logLine.slice(logLine.indexOf('"') + 1, logLine.lastIndexOf('"'));
  // split string up into array
  request = request.split(' ');

  // will look like "200"
  const responseCode = logLine.split(' ').reverse()[1];

  // will look like "1497"
  const size = logLine.split(' ').reverse()[0];

  // generate object
  const JSONObject = {
    'host': hostAndTime[0],
    'datetime': {
      'day': hostAndTime[1],
      'hour': hostAndTime[2],
      'minute': hostAndTime[3],
      'second': hostAndTime[4]
    },
    'request': {
      'method': '-',
      'url': '-',
      'protocol': '-',
      'protocol_version': '-'
    },
    'response_code': responseCode,
    'document_size': size
  };

  if (request.length === 3) {
    JSONObject.request = {
      'method': request[0],
      'url': request[1],
      'protocol': request[2].split('/')[0],
      'protocol_version': request[2].split('/')[1]
    }
  }

  return JSONObject;

};

module.exports = parseLineToJSON;
