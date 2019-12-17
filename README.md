<!-- @format -->

# umi-fabric

一个包含 prettier，eslint，stylelint 的配置文件合集

A collection of configuration files containing prettier, eslint, stylelint

# Use

in `.eslintrc.js`

```js
module.exports = {
  extends: [require.resolve('@umijs/fabric/dist/eslint')],
  globals: {
    ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION: true,
    page: true,
  },
};
```
