const path = require.resolve('../dist/eslint');
console.log(path);
module.exports = {
  extends: [path],
  globals: {
    ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION: true,
    page: true,
  },
};
