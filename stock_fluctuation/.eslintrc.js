module.exports = {
  extends: ['airbnb', 'plugin:jest/recommended', 'plugin:react/recommended'],
  plugins: ['import', 'jest', 'react'],
  env: {
    node: true,
    'jest/globals': true
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    }
  },
  settings: {
    react: {
      createClass: 'createReactClass', // Regex for Component Factory to use,
      // default to "createReactClass"
      pragma: 'React', // Pragma to use, default to "React"
      version: '15.0', // React version, default to the latest React stable release
      flowVersion: '0.53' // Flow version
    },
    propWrapperFunctions: ['forbidExtraProps'] // The names of any functions used to wrap the
    // propTypes object, e.g. `forbidExtraProps`.
    // If this isn't set, any propTypes wrapped in
    // a function will be skipped.
  },
  rules: {
    'no-console': 0,
    'import/extensions': ['error', 'never', { jsx: 'always' }],
    'jsx-a11y/anchor-is-valid': [
      'error',
      {
        components: ['Link'],
        specialLink: ['to']
      }
    ]
  }
};
