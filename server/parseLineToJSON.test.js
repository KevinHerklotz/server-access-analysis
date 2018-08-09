const parseLineToJSON = require('./parseLineToJSON');

describe('parseLineToJSON()', () => {
  it('should return the correct JSON string', () => {
    const givenString = '141.243.1.172 [29:23:53:25] "GET /Software.html HTTP/1.0" 200 1497';
    const expectedJSON = {
      "host": "141.243.1.172",
      "datetime": {
        "day": "29",
        "hour": "23",
        "minute": "53",
        "second": "25"
      },
      "request": {
        "method": "GET",
        "url": "/Software.html",
        "protocol": "HTTP",
        "protocol_version": "1.0"
      },
      "response_code": "200",
      "document_size": "1497"
    };
    const expectedJSONString = JSON.stringify(expectedJSON);
    expect(parseLineToJSON(givenString)).toBe(expectedJSONString);
  });
});
