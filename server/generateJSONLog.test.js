const generateJSONLog = require('./generateJSONLog');
const fs = require('fs');
const rimraf = require('rimraf');

afterEach(() => {
  rimraf('./testdist', function() {
    console.log('done');
  });
});

describe('Folder structure', () => {
  it('at the beginning "./testdist" should not exist', () => {
    expect(fs.existsSync('./testdist')).toBe(false);
  });
});
