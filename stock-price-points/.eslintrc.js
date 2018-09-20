/**
 * These rules enforce the AIRBNB Style Guide
 *
 * Visit this repo for more information:
 *   https://github.com/reactorcore/eslint-config-hackreactor
 */

module.exports = {
  extends: "airbnb",
  env: {
    "browser": true,
    "node": true,
    "jest": true,
  },
  rules: {
    "no-console": 0,
    "import/extensions": ["error", "never", { "jsx": "always" }],
    'no-plusplus': 'off',
    "no-param-reassign": 0,
  },
};
