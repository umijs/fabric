import * as path from 'path';
import * as fs from 'fs';
import tsEslintConfig from './tsEslintConfig';

const parserOptions: {
  tsconfigRootDir?: string;
  project?: string;
  createDefaultProgram?: boolean;
} = {
  project: './tsconfig.json',
};

const isTsProject = fs.existsSync(path.join(process.env.PWD || '.', './tsconfig.json'));

if (isTsProject) {
  console.log('这是一个 TypeScript 项目，如果不是请删除 tsconfig.json');
}
module.exports = {
  extends: ['eslint-config-airbnb-base', 'prettier', 'prettier/react'].concat(
    isTsProject ? ['prettier/@typescript-eslint', 'plugin:@typescript-eslint/recommended'] : []
  ),
  parser: isTsProject ? '@typescript-eslint/parser' : undefined,
  plugins: ['eslint-comments', 'react', 'jest', 'unicorn', 'react-hooks'],
  env: {
    browser: true,
    node: true,
    es6: true,
    mocha: true,
    jest: true,
    jasmine: true,
  },
  rules: {
    'react/jsx-wrap-multilines': 0,
    'react/prop-types': 0,
    'react/forbid-prop-types': 0,
    'react/sort-comp': 0,
    'react/jsx-one-expression-per-line': 0,
    'generator-star-spacing': 0,
    'function-paren-newline': 0,
    'import/no-unresolved': [
      2,
      {
        ignore: ['^@/', '^@@/', '^@alipay/bigfish/'],
        caseSensitive: true,
        commonjs: true,
      },
    ],
    'import/order': 'warn',
    'react/jsx-props-no-spreading': 0,
    'react/state-in-constructor': 0,
    'no-confusing-arrow': 1,
    'react/static-property-placement': 0,
    'import/no-extraneous-dependencies': [
      2,
      {
        optionalDependencies: true,
        devDependencies: [
          '**/tests/**.{ts,js,jsx,tsx}',
          '**/_test_/**.{ts,js,jsx,tsx}',
          '/mock/**/**.{ts,js,jsx,tsx}',
          '**/**.test.{ts,js,jsx,tsx}',
          '**/_mock.{ts,js,jsx,tsx}',
          '**/example/**.{ts,js,jsx,tsx}',
          '**/examples/**.{ts,js,jsx,tsx}',
        ],
      },
    ],
    'jsx-a11y/no-noninteractive-element-interactions': 0,
    'jsx-a11y/click-events-have-key-events': 0,
    'jsx-a11y/no-static-element-interactions': 0,
    'jsx-a11y/anchor-is-valid': 0,
    'linebreak-style': 0,
    // Too restrictive, writing ugly code to defend against a very unlikely scenario: https://eslint.org/docs/rules/no-prototype-builtins
    'no-prototype-builtins': 'off',
    'import/prefer-default-export': 'off',
    'import/no-default-export': [0, 'camel-case'],
    // Too restrictive: https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/destructuring-assignment.md
    'react/destructuring-assignment': 'off',
    'react/jsx-filename-extension': 'off',
    'unicorn/prevent-abbreviations': 'off',
    'sort-imports': 0,
    'import/no-cycle': 0,
    'react/no-array-index-key': 'warn',
    'react-hooks/rules-of-hooks': 'error', // Checks rules of Hooks
    'react-hooks/exhaustive-deps': 'warn', // Checks deps of Hooks
    'react/require-default-props': 0,
    'react/jsx-fragments': 0,
    // Conflict with prettier
    'arrow-body-style': 0,
    'arrow-parens': 0,
    'object-curly-newline': 0,
    'implicit-arrow-linebreak': 0,
    'operator-linebreak': 0,
    'eslint-comments/no-unlimited-disable': 0,
    'no-param-reassign': 2,
    'space-before-function-paren': 0,
    'import/extensions': 0,
    ...(isTsProject ? tsEslintConfig : {}),
  },
  settings: {
    // support import modules from TypeScript files in JavaScript files
    'import/resolver': {
      node: {
        extensions: isTsProject ? ['.js', '.jsx', '.ts', '.tsx', '.d.ts'] : ['.js', '.jsx'],
      },
    },
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx', '.d.ts'],
    },
    'import/extensions': ['.js', '.mjs', '.jsx', '.ts', '.tsx', '.d.ts'],
    'import/external-module-folders': ['node_modules', 'node_modules/@types'],
    polyfills: ['fetch', 'Promise', 'URL', 'object-assign'],
  },
  parserOptions,
};
