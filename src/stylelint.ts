module.exports = {
  extends: [
    'stylelint-config-standard',
    'stylelint-config-css-modules',
    'stylelint-config-rational-order',
    'stylelint-config-prettier',
  ].map(key => require.resolve(key)),
  plugins: ['stylelint-order', 'stylelint-declaration-block-no-ignored-properties'].map(key =>
    require.resolve(key),
  ),
  rules: {
    'no-descending-specificity': null,
    //https://github.com/stylelint/stylelint/issues/4114
    'function-calc-no-invalid': null,
    'plugin/declaration-block-no-ignored-properties': true,
  },
};
