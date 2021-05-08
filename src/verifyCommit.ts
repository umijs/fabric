/* eslint-disable import/no-extraneous-dependencies */
// Invoked on the commit-msg git hook by yorkie.

const chalk = require('chalk');
const osLocale = require('os-locale');

const msgPath = process.env.GIT_PARAMS || process.env.HUSKY_GIT_PARAMS;
const msg = require('fs').readFileSync(msgPath, 'utf-8').trim();

const commitRE = /^(((\ud83c[\udf00-\udfff])|(\ud83d[\udc00-\ude4f\ude80-\udeff])|[\u2600-\u2B55]) )?(revert: )?(feat|fix|docs|UI|refactor|⚡perf|workflow|build|CI|typos|chore|tests|types|wip|release|dep|locale)(\(.+\))?: .{1,50}/;

if (!commitRE.test(msg)) {
  console.log();
  osLocale().then((locale: string) => {
    if (locale === 'zh-CN') {
      console.error(
        `  ${chalk.bgRed.white(' ERROR ')} ${chalk.red(`提交日志不符合规范`)}\n\n${chalk.red(
          `  合法的提交日志格式如下(emoji 和 模块可选填)：\n\n`,
        )}    
    ${chalk.green(`💥 feat(模块): 添加了个很棒的功能`)}
    ${chalk.green(`🐛 fix(模块): 修复了一些 bug`)}
    ${chalk.green(`📝 docs(模块): 更新了一下文档`)}
    ${chalk.green(`🌷 UI(模块): 修改了一下样式`)}
    ${chalk.green(`🏰 chore(模块): 对脚手架做了些更改`)}
    ${chalk.green(`🌐 locale(模块): 为国际化做了微小的贡献`)}
    ${chalk.red(`See .github/commit-convention.md for more details.\n`)}`,
      );
    } else {
      console.error(
        `  ${chalk.bgRed.white(' ERROR ')} ${chalk.red(
          `invalid commit message format.`,
        )}\n\n${chalk.red(
          `  Proper commit message format is required for automated changelog generation. Examples:\n\n`,
        )}    
    ${chalk.green(`💥 feat(compiler): add 'comments' option`)}
    ${chalk.green(`🐛 fix(compiler): fix some bug`)}
    ${chalk.green(`📝 docs(compiler): add some docs`)}
    ${chalk.green(`🌷 UI(compiler): better styles`)}
    ${chalk.green(`🏰 chore(compiler): Made some changes to the scaffolding`)}
    ${chalk.green(`🌐 locale(compiler): Made a small contribution to internationalization`)}\n
    ${chalk.red(`See .github/commit-convention.md for more details.\n`)}`,
      );
    }

    process.exit(1);
  });
}
