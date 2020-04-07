/** @format */

'use strict';

import * as path from 'path';
const eslint = require('./eslint');

const eslintFolder = path.join(path.dirname(require.resolve('eslint')), '..');

const moduleResolverPath = path.join(eslintFolder, 'lib/shared/relative-module-resolver');
const ModuleResolver = require(moduleResolverPath);

ModuleResolver.resolve = function (moduleName: string) {
  return require.resolve(moduleName);
};

module.exports = {
  extends: [
    'airbnb',
    'prettier',
    'airbnb-typescript',
    'prettier/react',
    'prettier/@typescript-eslint',
  ].map((key) => require.resolve(`eslint-config-${key}`)),
  plugins: ['@typescript-eslint', 'eslint-comments', 'jest', 'unicorn', 'react-hooks'],
  env: {
    browser: true,
    node: true,
    es6: true,
    mocha: true,
    jest: true,
    jasmine: true,
  },
  rules: {
    ...eslint.rules,
    'no-param-reassign': 1,
    'import/no-unresolved': [
      1,
      {
        ignore: ['^@/', '^@@/', '^@alipay/bigfish/'],
        caseSensitive: true,
        commonjs: true,
      },
    ],
    'import/no-extraneous-dependencies': [
      1,
      {
        optionalDependencies: true,
        devDependencies: [
          '**/tests/**.{ts,js,jsx,tsx}',
          '**/_test_/**.{ts,js,jsx,tsx}',
          '/mock/**/**.{ts,js,jsx,tsx}',
          '**/**.test.{ts,js,jsx,tsx}',
          '**/_mock.{ts,js,jsx,tsx}',
        ],
      },
    ],
    // Use function hoisting to improve code readability
    'no-use-before-define': ['warn', { functions: false, classes: true, variables: true }],
    '@typescript-eslint/no-use-before-define': [
      'warn',
      { functions: false, classes: true, variables: true, typedefs: true },
    ],
    'max-len': 'warn',
    'no-mixed-operators': 'warn',
    'comma-dangle': 0,
  },
  settings: {
    'import/resolver': { node: { extensions: ['.js', '.jsx', '.ts', '.tsx'] } },
  },
};
