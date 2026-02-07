import { Given, When, Then } from '@cucumber/cucumber';
import { PlaywrightWorld } from '../../support/PlaywrightWorld';
import { LoginPage } from '../../pages/LoginPage';

Given('că sunt pe pagina de login', async function (this: PlaywrightWorld) {
  const loginPage = new LoginPage(this.page!, this.baseUrl);
  await loginPage.navigateTo();
  await this.page!.waitForTimeout(1000);
});

Given(
  'că sunt logat în aplicație cu username-ul {string} și parola {string}',
  async function (this: PlaywrightWorld, username: string, password: string) {
    const loginPage = new LoginPage(this.page!, this.baseUrl);
    await loginPage.navigateTo();
    await loginPage.login(username, password);
    await this.page!.waitForTimeout(1000);
  }
);

Given('că sunt logat în aplicație', async function (this: PlaywrightWorld) {
  const loginPage = new LoginPage(this.page!, this.baseUrl);
  await loginPage.navigateTo();
  await loginPage.login('standard_user', 'secret_sauce');
  await this.page!.waitForTimeout(1000);
});

Given('că sunt pe pagina de produse', async function (this: PlaywrightWorld) {
  const loginPage = new LoginPage(this.page!, this.baseUrl);
  await loginPage.navigateTo();
  await loginPage.login('standard_user', 'secret_sauce');
  await this.page!.waitForTimeout(1000);
});

Given('că sunt pe pagina de coș', async function (this: PlaywrightWorld) {
  const loginPage = new LoginPage(this.page!, this.baseUrl);
  await loginPage.navigateTo();
  await loginPage.login('standard_user', 'secret_sauce');
  await this.page!.goto(`${this.baseUrl}/cart.html`);
  await this.page!.waitForTimeout(1000);
});

Given('că am adăugat un produs în coș', async function (this: PlaywrightWorld) {
  const loginPage = new LoginPage(this.page!, this.baseUrl);
  await loginPage.navigateTo();
  await loginPage.login('standard_user', 'secret_sauce');
  const { ProductsPage } = await import('../../pages/ProductsPage');
  const productsPage = new ProductsPage(this.page!);
  await productsPage.waitForPageLoad();
  await productsPage.addProductToCart(0);
  await this.page!.waitForTimeout(1000);
});

Given('că am adăugat produse în coș', async function (this: PlaywrightWorld) {
  const loginPage = new LoginPage(this.page!, this.baseUrl);
  await loginPage.navigateTo();
  await loginPage.login('standard_user', 'secret_sauce');
  const { ProductsPage } = await import('../../pages/ProductsPage');
  const productsPage = new ProductsPage(this.page!);
  await productsPage.waitForPageLoad();
  await productsPage.addProductToCart(0);
  await productsPage.addProductToCart(1);
  await this.page!.waitForTimeout(1000);
});

Given('că am produse în coș cu preț total de {string}', async function (this: PlaywrightWorld, totalPrice: string) {
  const loginPage = new LoginPage(this.page!, this.baseUrl);
  await loginPage.navigateTo();
  await loginPage.login('standard_user', 'secret_sauce');
  const { ProductsPage } = await import('../../pages/ProductsPage');
  const productsPage = new ProductsPage(this.page!);
  await productsPage.waitForPageLoad();
  await productsPage.addProductToCart(0);
  await this.page!.waitForTimeout(1000);
});

Given('că sunt pe pagina de checkout', async function (this: PlaywrightWorld) {
  const loginPage = new LoginPage(this.page!, this.baseUrl);
  await loginPage.navigateTo();
  await loginPage.login('standard_user', 'secret_sauce');
  const { ProductsPage } = await import('../../pages/ProductsPage');
  const productsPage = new ProductsPage(this.page!);
  await productsPage.waitForPageLoad();
  await productsPage.addProductToCart(0);
  await productsPage.clickCartIcon();
  const { CartPage } = await import('../../pages/CartPage');
  const cartPage = new CartPage(this.page!);
  await cartPage.waitForPageLoad();
  await cartPage.clickCheckout();
  await this.page!.waitForTimeout(1000);
});

Given('că am făcut logout', async function (this: PlaywrightWorld) {
  const loginPage = new LoginPage(this.page!, this.baseUrl);
  await loginPage.navigateTo();
  await loginPage.login('standard_user', 'secret_sauce');
  const { ProductsPage } = await import('../../pages/ProductsPage');
  const productsPage = new ProductsPage(this.page!);
  await productsPage.waitForPageLoad();
  await productsPage.clickMenuButton();
  await this.page!.waitForTimeout(500);
  await productsPage.clickLogout();
  await this.page!.waitForTimeout(1000);
});

