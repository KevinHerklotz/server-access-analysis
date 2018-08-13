module.exports = {
  "parser": "babel-eslint",
  "env": {
      "browser": true,
      "es6": true,
      "jest": true,
      "node": true,
  },
  "extends": "airbnb/base",
  "rules": {
      "max-len": ["error", {
        "code": 110,
        "tabWidth": 2,
        "ignoreUrls": true,
        "ignoreComments": true
      }],
  }
};
