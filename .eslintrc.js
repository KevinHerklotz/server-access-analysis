module.exports = {
  "parser": "babel-eslint",
  "env": {
      "browser": true,
      "es6": true,
      "jest": true,
      "node": true,
  },
  "globals": {
    "Chart": true,
  },
  "extends": "airbnb/base",
  "rules": {
      "max-len": ["error", {
        "code": 110,
        "tabWidth": 2,
        "ignoreUrls": true,
        "ignoreComments": true
      }],
      "no-new": 0,
      "arrow-body-style": 0,
      "prefer-destructuring": 0, // I don't like this rule for readablility reasons
      "import/extensions": 0,
  }
};
