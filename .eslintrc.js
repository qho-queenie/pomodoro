module.exports = {
  'env': {
    'browser': true,
    'es6': true,
  },
  'extends': [
    'react-app',
    'react-app/jest',
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'airbnb',
  ],
  'globals': {
    'Atomics': 'readonly',
    'SharedArrayBuffer': 'readonly',
  },
  'parserOptions': {
    'ecmaFeatures': {
      'jsx': true,
    },
    'ecmaVersion': 2018,
    'sourceType': 'module',
  },
  'plugins': [
    'react',
    'react-hooks',
  ],
  'rules': {
  },
  'settings': {
    'react': {
      'version': 'detect',
    },
  },
};

