/* eslint-disable global-require */
const { execSync } = require('child_process');
const { join } = require('path');
const findChrome = require('carlo/lib/find_chrome');
const detectInstaller = require('detect-installer');

const installPuppeteer = () => {
  // find can use package manger
  const packages = detectInstaller(join(__dirname, '../../'));
  // get installed package manger
  const packageName = packages.find(detectInstaller.hasPackageCommand) || 'npm';
  console.log(`🤖 will use ${packageName} install puppeteer`);
  const command = `${packageName} ${packageName.includes('yarn') ? 'add' : 'i'} puppeteer`;
  execSync(command, {
    stdio: 'inherit',
  });
};

const initPuppeteer = async () => {
  try {
    const findChromePath = await findChrome({});
    const { executablePath } = findChromePath;
    console.log(`🧲 find you browser in ${executablePath}`);
    return;
  } catch (error) {
    console.log('🧲 no find chrome');
  }

  try {
    require.resolve('puppeteer');
  } catch (error) {
    // need install puppeteer
    await installPuppeteer();
  }
};

initPuppeteer();
