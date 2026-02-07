import { When, Then } from '@cucumber/cucumber';
import { PlaywrightWorld } from '../../support/PlaywrightWorld';
import { LoginPage } from '../../pages/LoginPage';
import { ProductsPage } from '../../pages/ProductsPage';

When('introduc username-ul {string}', async function (this: PlaywrightWorld, username: string) {
  const loginPage = new LoginPage(this.page!, this.baseUrl);
  await loginPage.enterUsername(username);
});

When('introduc parola {string}', async function (this: PlaywrightWorld, password: string) {
  const loginPage = new LoginPage(this.page!, this.baseUrl);
  await loginPage.enterPassword(password);
});

When('click pe butonul de login', async function (this: PlaywrightWorld) {
  const loginPage = new LoginPage(this.page!, this.baseUrl);
  await loginPage.clickLoginButton();
  await this.page!.waitForTimeout(2000);
});

When('click pe butonul de login fără să completez credențialele', async function (this: PlaywrightWorld) {
  const loginPage = new LoginPage(this.page!, this.baseUrl);
  await loginPage.clickLoginButton();
  await this.page!.waitForTimeout(2000);
});

Then('ar trebui să fiu logat cu succes', async function (this: PlaywrightWorld) {
  const loginPage = new LoginPage(this.page!, this.baseUrl);
  const isLoggedIn = await loginPage.isLoggedIn();
  if (!isLoggedIn) {
    throw new Error('Login failed - user is not on products page');
  }
});

Then('ar trebui să văd pagina de produse', async function (this: PlaywrightWorld) {
  const productsPage = new ProductsPage(this.page!);
  const isLoaded = await productsPage.isLoaded();
  if (!isLoaded) {
    throw new Error('Products page is not loaded');
  }
});

Then('ar trebui să văd un mesaj de eroare', async function (this: PlaywrightWorld) {
  const loginPage = new LoginPage(this.page!, this.baseUrl);
  const isErrorVisible = await loginPage.isErrorVisible();
  if (!isErrorVisible) {
    throw new Error('Error message is not visible');
  }
});

Then('nu ar trebui să fiu logat', async function (this: PlaywrightWorld) {
  const loginPage = new LoginPage(this.page!, this.baseUrl);
  const isLoggedIn = await loginPage.isLoggedIn();
  if (isLoggedIn) {
    throw new Error('User should not be logged in');
  }
});

Then('ar trebui să văd {string}', async function (this: PlaywrightWorld, expectedResult: string) {
  if (expectedResult === 'pagina de produse') {
    const productsPage = new ProductsPage(this.page!);
    const isLoaded = await productsPage.isLoaded();
    if (!isLoaded) {
      throw new Error('Products page is not loaded');
    }
  } else if (expectedResult === 'mesaj de eroare') {
    const loginPage = new LoginPage(this.page!, this.baseUrl);
    const isErrorVisible = await loginPage.isErrorVisible();
    if (!isErrorVisible) {
      throw new Error('Error message is not visible');
    }
  }
});

