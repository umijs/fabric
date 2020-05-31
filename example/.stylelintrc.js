const fabric = require('../dist/index');

module.exports = {
  ...fabric.stylelint,
  ignoreFiles: ['**/*.js', ''],
};
