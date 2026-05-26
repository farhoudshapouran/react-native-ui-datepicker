const path = require('path');
const { getDefaultConfig } = require('@expo/metro-config');

const root = path.resolve(__dirname, '..');
const exampleNodeModules = path.join(__dirname, 'node_modules');

const defaultConfig = getDefaultConfig(__dirname);
const extraNodeModules = new Proxy(
  {
    'react-native-ui-datepicker': root,
  },
  {
    get: (target, name) => {
      if (typeof name !== 'string') return undefined;
      return target[name] || path.join(exampleNodeModules, name);
    },
  }
);

module.exports = {
  ...defaultConfig,

  projectRoot: __dirname,
  watchFolders: [root],

  resolver: {
    ...defaultConfig.resolver,
    // Always resolve dependencies from example first to avoid duplicate React trees
    nodeModulesPaths: [exampleNodeModules],
    disableHierarchicalLookup: true,
    extraNodeModules,
  },
};
