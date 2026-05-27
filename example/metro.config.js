const path = require('path');
const fs = require('fs');
const { getDefaultConfig } = require('@expo/metro-config');

const root = path.resolve(__dirname, '..');
const exampleNodeModules = path.join(__dirname, 'node_modules');
const rootNodeModules = path.join(root, 'node_modules');

const defaultConfig = getDefaultConfig(__dirname);
const extraNodeModules = new Proxy(
  {
    'react-native-ui-datepicker': root,
  },
  {
    get: (target, name) => {
      if (typeof name !== 'string') return undefined;
      if (target[name]) return target[name];

      const exampleModule = path.join(exampleNodeModules, name);
      return fs.existsSync(exampleModule)
        ? exampleModule
        : path.join(rootNodeModules, name);
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
    nodeModulesPaths: [exampleNodeModules, rootNodeModules],
    disableHierarchicalLookup: true,
    extraNodeModules,
  },
};
