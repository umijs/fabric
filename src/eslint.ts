import * as path from 'path';
import * as fs from 'fs';
import tsEslintConfig from './tsEslintConfig';

const parserOptions = {
  ecmaFeatures: {
    jsx: true,
  },
  babelOptions: {
    presets: ['@babel/preset-env', '@babel/preset-react'],
    plugins: ['@babel/plugin-proposal-class-properties'],
  },
  requireConfigFile: false,
  project: './tsconfig.json',
};

const isJsMoreTs = async (path = 'src') => {
  const fg = require('fast-glob');
  const jsFiles = await fg(`${path}/src/**/*.{js,jsx}`, { deep: 3 });
  const tsFiles = await fg(`${path}/src/**/*.{ts,tsx}`, { deep: 3 });
  return jsFiles.length > tsFiles.length;
};

const configPath = path.join(__dirname, 'fabric.rc');
const isTsProject = fs.existsSync(path.join(process.cwd() || '.', './tsconfig.json'));

if (isTsProject) {
  try {
    if (!fs.existsSync(configPath) && fs.existsSync(path.join('configPath', '..'))) {
      isJsMoreTs(configPath).then((jsMoreTs) => {
        fs.writeFileSync(configPath, new Date().getDate().toString());
        if (!jsMoreTs) return;
        console.log('这是一个 TypeScript 项目，如果不是请删除 tsconfig.json');
      });
    } else {
      const cacheTime = fs.readFileSync(configPath).toString();
      if (new Date().getDate() !== parseInt(cacheTime, 10)) {
        fs.unlink(configPath, () => {});
      }
    }
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  extends: ['eslint-config-airbnb-base', 'prettier', 'prettier/react'].concat(
    isTsProject
      ? ['prettier/@typescript-eslint', 'plugin:@typescript-eslint/recommended']
      : ['plugin:react/recommended'],
  ),
  parser: isTsProject ? '@typescript-eslint/parser' : '@babel/eslint-parser',
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
    'react/display-name': 0,
    'react/jsx-props-no-spreading': 0,
    'react/state-in-constructor': 0,
    'react/static-property-placement': 0,
    // Too restrictive: https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/destructuring-assignment.md
    'react/destructuring-assignment': 'off',
    'react/jsx-filename-extension': 'off',
    'react/no-array-index-key': 'warn',
    'react-hooks/rules-of-hooks': 'error', // Checks rules of Hooks
    'react-hooks/exhaustive-deps': 'warn', // Checks deps of Hooks
    'react/require-default-props': 0,
    'react/jsx-fragments': 0,
    'react/jsx-wrap-multilines': 0,
    'react/prop-types': 0,
    'react/forbid-prop-types': 0,
    'react/sort-comp': 0,
    'react/react-in-jsx-scope': 0,
    'react/jsx-one-expression-per-line': 0,
    'generator-star-spacing': 0,
    'function-paren-newline': 0,
    'import/no-unresolved': 0,
    'import/order': 0,
    'import/no-named-as-default': 0,
    'import/no-cycle': 0,
    'import/prefer-default-export': 0,
    'import/no-default-export': 0,
    'import/no-extraneous-dependencies': 0,
    'import/named': 0,
    'import/no-named-as-default-member': 0,
    'import/no-duplicates': 0,
    'import/no-self-import': 0,
    'import/extensions': 0,
    'import/no-useless-path-segments': 0,
    'jsx-a11y/no-noninteractive-element-interactions': 0,
    'jsx-a11y/click-events-have-key-events': 0,
    'jsx-a11y/no-static-element-interactions': 0,
    'jsx-a11y/anchor-is-valid': 0,
    'sort-imports': 0,
    'class-methods-use-this': 0,
    'no-confusing-arrow': 0,
    'linebreak-style': 0,
    // Too restrictive, writing ugly code to defend against a very unlikely scenario: https://eslint.org/docs/rules/no-prototype-builtins
    'no-prototype-builtins': 'off',
    'unicorn/prevent-abbreviations': 'off',
    // Conflict with prettier
    'arrow-body-style': 0,
    'arrow-parens': 0,
    'object-curly-newline': 0,
    'implicit-arrow-linebreak': 0,
    'operator-linebreak': 0,
    'eslint-comments/no-unlimited-disable': 0,
    'no-param-reassign': 2,
    'space-before-function-paren': 0,
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
