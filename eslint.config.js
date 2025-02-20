const prettier = require('eslint-plugin-prettier');
const reactHooks = require('eslint-plugin-react-hooks');
const reactNative = require('eslint-plugin-react-native');

module.exports = [
  {
    files: ['src/**/*.{js,jsx,ts,tsx}'],
    ignores: [
      'node_modules/',
      'lib/',
      'example/',
      'demo/',
      '*.config.js',
      'tsconfig.json',
    ],
    plugins: {
      prettier,
      'react-hooks': reactHooks,
      'react-native': reactNative,
    },
    rules: {
      'react/react-in-jsx-scope': 'off',
      'prettier/prettier': 'warn',
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      'react-native/no-inline-styles': 'warn',
    },
    languageOptions: {
      parser: require('@typescript-eslint/parser'),
      ecmaVersion: 'latest',
      sourceType: 'module',
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        project: './tsconfig.json',
      },
    },
  },
];
