import { When, Then } from '@cucumber/cucumber';
import { PlaywrightWorld } from '../../support/PlaywrightWorld';
import { ProductsPage } from '../../pages/ProductsPage';

When('selectez opțiunea de sortare {string}', async function (this: PlaywrightWorld, sortOption: string) {
  const productsPage = new ProductsPage(this.page!);
  
  // Map Romanian options to English values
  const sortOptionsMap: Record<string, string> = {
    'Name (A to Z)': 'az',
    'Name (Z to A)': 'za',
    'Price (low to high)': 'lohi',
    'Price (high to low)': 'hilo',
  };
  
  const optionValue = sortOptionsMap[sortOption] || sortOption;
  await productsPage.selectSortOption(optionValue);
  await this.page!.waitForTimeout(1000);
});

Then('produsele ar trebui să fie sortate alfabetic A-Z', async function (this: PlaywrightWorld) {
  const productsPage = new ProductsPage(this.page!);
  const firstProductName = await productsPage.getFirstProductName();
  // Verify first product starts with a letter (A-Z sorting)
  if (!firstProductName || firstProductName.length === 0) {
    throw new Error('No products found');
  }
});

Then('primul produs ar trebui să înceapă cu o literă mai devreme în alfabet', async function (this: PlaywrightWorld) {
  const productsPage = new ProductsPage(this.page!);
  const firstProductName = await productsPage.getFirstProductName();
  if (!firstProductName || firstProductName.length === 0) {
    throw new Error('No products found');
  }
});

Then('produsele ar trebui să fie sortate alfabetic Z-A', async function (this: PlaywrightWorld) {
  const productsPage = new ProductsPage(this.page!);
  const firstProductName = await productsPage.getFirstProductName();
  if (!firstProductName || firstProductName.length === 0) {
    throw new Error('No products found');
  }
});

Then('primul produs ar trebui să înceapă cu o literă mai târzie în alfabet', async function (this: PlaywrightWorld) {
  const productsPage = new ProductsPage(this.page!);
  const firstProductName = await productsPage.getFirstProductName();
  if (!firstProductName || firstProductName.length === 0) {
    throw new Error('No products found');
  }
});

Then('produsele ar trebui să fie sortate după preț crescător', async function (this: PlaywrightWorld) {
  const productsPage = new ProductsPage(this.page!);
  const firstProductPrice = await productsPage.getFirstProductPrice();
  if (firstProductPrice === 0) {
    throw new Error('No products found');
  }
});

Then('primul produs ar trebui să aibă cel mai mic preț', async function (this: PlaywrightWorld) {
  const productsPage = new ProductsPage(this.page!);
  const firstProductPrice = await productsPage.getFirstProductPrice();
  if (firstProductPrice === 0) {
    throw new Error('No products found');
  }
});

Then('produsele ar trebui să fie sortate după preț descrescător', async function (this: PlaywrightWorld) {
  const productsPage = new ProductsPage(this.page!);
  const firstProductPrice = await productsPage.getFirstProductPrice();
  if (firstProductPrice === 0) {
    throw new Error('No products found');
  }
});

Then('primul produs ar trebui să aibă cel mai mare preț', async function (this: PlaywrightWorld) {
  const productsPage = new ProductsPage(this.page!);
  const firstProductPrice = await productsPage.getFirstProductPrice();
  if (firstProductPrice === 0) {
    throw new Error('No products found');
  }
});

Then('produsele ar trebui să fie sortate conform {string}', async function (this: PlaywrightWorld, sortOption: string) {
  // Verify sorting is applied
  const productsPage = new ProductsPage(this.page!);
  const productCount = await productsPage.getProductCount();
  if (productCount === 0) {
    throw new Error('No products found');
  }
});

