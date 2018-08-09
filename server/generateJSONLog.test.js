// jest must be called with option --runInBand because this testfile contains tests that need to be run serially

const generateJSONLog = require('./generateJSONLog');
const fs = require('fs');
const rimraf = require('rimraf');

afterEach(() => {
  rimraf('./testdist', function() {
    console.log('done');
  });
});

describe('generateJSONLog()', () => {
  it('at the beginning "./testdist" should not exist', () => {
    expect(fs.existsSync('./testdist')).toBe(false);
  });

  it('Should generate file', async () => {
    expect.assertions(1);
    await generateJSONLog('./log/__mocks__/epa-http.txt', './testdist/testlog.js');

    expect(fs.existsSync('./testdist')).toBe(true);
  });

  it('File should have correct content', async (done) => {
    expect.assertions(2);
    await generateJSONLog('./log/__mocks__/epa-http.txt', './testdist/testlog2.js');

    fs.readFile('./testdist/testlog2.js', 'utf-8', (err, filecontent) => {
      if (err) return console.error('Failed reading file:', err);

      // check if there is an "export default" in the file
      expect(filecontent).toEqual(expect.stringContaining('export default ['));
      // check if there is "141.243.1.172" in the file (that the JSON should be correct was tested in parseLineToJSON.test.js already)
      expect(filecontent).toEqual(expect.stringContaining('141.243.1.172'));
      done();
    });
  });
});
