import eslintPluginPrettier from 'eslint-plugin-prettier';
// module.exports = {
//   extends: ['@react-native', 'prettier'],
//   plugins: ['prettier'],
//   rules: {
//     'prettier/prettier': 'error',
//   },
// };

export default [
  {
    //extends: ['@react-native', 'prettier'],
    // ignores: [
    //   // '.*.js',
    //   // '.*.ts',
    //   'node_modules/',
    //   'lib/',
    //   'example/',
    //   '**/*.config.js',
    // ],
    plugins: { prettier: eslintPluginPrettier },
    rules: {
      'react/react-in-jsx-scope': 'off',
      'prettier/prettier': 'error',
    },
  },
];
