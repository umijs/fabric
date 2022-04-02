/** @format */

module.exports = {
  singleQuote: true,
  semi: false,
  trailingComma: 'all',
  printWidth: 100,
  proseWrap: 'never',
  tabWidth: 2,
  bracketSpacing: true,
  jsxBracketSameLine: true,
  endOfLine: 'lf',
  overrides: [
    {
      files: '.prettierrc',
      options: {
        parser: 'json',
      },
    },
    {
      files: 'document.ejs',
      options: {
        parser: 'html',
      },
    },
  ],
};
