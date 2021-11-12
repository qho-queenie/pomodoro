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
    "plugin:jsx-a11y/recommended",
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
    "jsx-a11y",
  ],
  'rules': {
    "react/jsx-sort-props": [1, {
      "callbacksLast": true,
      "shorthandFirst": true,
      "noSortAlphabetically": false,
    }],
  },
  'settings': {
    'react': {
      'version': 'detect',
    },
  },
};
