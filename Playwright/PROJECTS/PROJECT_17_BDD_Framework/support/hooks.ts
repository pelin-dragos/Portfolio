import { Before, After, BeforeAll, AfterAll, setDefaultTimeout, setWorldConstructor } from '@cucumber/cucumber';
import { PlaywrightWorld } from './PlaywrightWorld';

// Set default timeout to 30 seconds
setDefaultTimeout(30 * 1000);

// Set custom World constructor
setWorldConstructor(PlaywrightWorld);

BeforeAll(async function () {
  console.log('🚀 Starting BDD test suite...');
});

Before(async function (this: PlaywrightWorld) {
  await this.initBrowser();
});

After(async function (this: PlaywrightWorld) {
  // Take screenshot on failure
  if (this.page) {
    try {
      const scenario = (this as any).pickle;
      if (scenario && scenario.name) {
        const screenshot = await this.page.screenshot({
          path: `screenshots/${scenario.name.replace(/\s+/g, '_')}.png`,
          fullPage: true,
        });
        this.attach(screenshot, 'image/png');
      }
    } catch (error) {
      console.log('Could not take screenshot:', error);
    }
  }
  await this.closeBrowser();
});

AfterAll(async function () {
  console.log('✅ BDD test suite completed');
});

