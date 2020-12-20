const path = require('path');

module.exports = {
  extends: [require.resolve(path.join(__dirname, '../dist/eslint'))],
  globals: {
    ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION: true,
    page: true,
  },
};
