// Invoked on the commit-msg git hook by yorkie.

const chalk = require('chalk');
const osLocale = require('os-locale');

const msgPath = process.env.GIT_PARAMS || process.env.HUSKY_GIT_PARAMS;
const msg = require('fs').readFileSync(msgPath, 'utf-8').trim();

const commitRE =
  /^(((\ud83c[\udf00-\udfff])|(\ud83d[\udc00-\ude4f\ude80-\udeff])|[\u2600-\u2B55]) )?(revert: )?(feat|fix|docs|UI|style|refactor|perf|workflow|build|CI|typos|chore|tests|types|wip|release|dep|locale)(\(.+\))?: .{1,50}/;

if (!commitRE.test(msg)) {
  console.log();
  osLocale().then((locale: string) => {
    if (locale === 'zh-CN') {
      console.error(
        `  ${chalk.bgRed.white(' ERROR ')} ${chalk.red(`提交日志不符合规范`)}\n\n${chalk.red(
          `  合法的提交日志格式如下(emoji 和 模块可选填)：\n\n`,
        )}    
    ${chalk.green(`💥 feat(模块): 添加了很棒的功能`)}
    ${chalk.green(`🐛 fix(模块): 修复一些 bug`)}
    ${chalk.green(`📝 docs(模块): 更新一下文档`)}
    ${chalk.green(`🌷 UI(模块): 修改一下样式`)}
    ${chalk.green(`⚛️ style(模块): 更新代码格式化`)}
    ${chalk.green(`💻 refactor(模块): 重构代码`)}
    ${chalk.green(`📘 pref(模块): 优化代码提升性能`)}
    ${chalk.green(`🛠️ test(模块): 修改测试文件`)}
    ${chalk.green(`🏰 chore(模块): 对脚手架做了些更改`)}
    ${chalk.green(`🌐 locale(模块): 为国际化做了微小的贡献`)}
    ${chalk.green(`⬅️ revert(模块): 回滚到之前的版本`)}
    ${chalk.red(`See .github/commit-convention.md for more details.\n`)}`,
      );
    } else {
      console.error(
        `  ${chalk.bgRed.white(' ERROR ')} ${chalk.red(
          `invalid commit message format.`,
        )}\n\n${chalk.red(
          `  Proper commit message format is required for automated changelog generation. Examples:\n\n`,
        )}
    ${chalk.green(`💥 feat(compiler): Added awesome features`)}
    ${chalk.green(`🐛 fix(compiler): About bugfix`)}
    ${chalk.green(`📝 docs(compiler): Update the documentation`)}
    ${chalk.green(`🌷 UI(compiler): Modify the style`)}
    ${chalk.green(`⚛️ style(compiler): Update code formatting`)}
    ${chalk.green(`💻 refactor(compiler): Refactor code`)}
    ${chalk.green(`📘 pref(compiler): Optimize code to improve performance`)}
    ${chalk.green(`🛠️ test(compiler): Modify test files`)}
    ${chalk.green(`🏰 chore(compiler): Made some changes to the scaffolding`)}
    ${chalk.green(`🌐 locale(compiler): Made a small contribution to internationalization`)}\n
    ${chalk.green(`⬅️ revert(compiler): Reverts a previous commit`)}
    ${chalk.red(`See .github/commit-convention.md for more details.\n`)}`,
      );
    }

    process.exit(1);
  });
}

export default () => {};
