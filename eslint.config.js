const prettier = require('eslint-plugin-prettier');
const reactHooks = require('eslint-plugin-react-hooks');

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
    plugins: { prettier, 'react-hooks': reactHooks },
    rules: {
      'react/react-in-jsx-scope': 'off',
      'prettier/prettier': 'warn',
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
    },
  },
];
