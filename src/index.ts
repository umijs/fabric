const eslint = require("./eslint");
const stylelint = require("./stylelint");
const prettier = require("./prettier");

module.exports = { stylelint, prettier, eslint, default: eslint };
