import { When, Then } from '@cucumber/cucumber';
import { PlaywrightWorld } from '../../support/PlaywrightWorld';
import { CheckoutPage } from '../../pages/CheckoutPage';
import { CheckoutOverviewPage } from '../../pages/CheckoutOverviewPage';
import { CheckoutCompletePage } from '../../pages/CheckoutCompletePage';

When('click pe butonul {string} la checkout', async function (this: PlaywrightWorld, buttonText: string) {
  if (buttonText === 'Checkout') {
    const { CartPage } = await import('../../pages/CartPage');
    const cartPage = new CartPage(this.page!);
    await cartPage.clickCheckout();
    await this.page!.waitForTimeout(1000);
  } else if (buttonText === 'Continue') {
    const checkoutPage = new CheckoutPage(this.page!);
    await checkoutPage.clickContinue();
    await this.page!.waitForTimeout(1000);
  } else if (buttonText === 'Finish') {
    const checkoutOverviewPage = new CheckoutOverviewPage(this.page!);
    await checkoutOverviewPage.clickFinish();
    await this.page!.waitForTimeout(1000);
  }
});

When(
  'completez formularul cu numele {string}, prenumele {string} și codul poștal {string}',
  async function (this: PlaywrightWorld, firstName: string, lastName: string, postalCode: string) {
    const checkoutPage = new CheckoutPage(this.page!);
    await checkoutPage.fillCheckoutForm(firstName, lastName, postalCode);
    await this.page!.waitForTimeout(500);
  }
);

When('click pe butonul {string} la checkout fără să completez formularul', async function (this: PlaywrightWorld, buttonText: string) {
  if (buttonText === 'Continue') {
    const checkoutPage = new CheckoutPage(this.page!);
    await checkoutPage.clickContinue();
    await this.page!.waitForTimeout(1000);
  }
});

When(
  'completez formularul cu prenumele {string} și codul poștal {string} dar fără nume',
  async function (this: PlaywrightWorld, lastName: string, postalCode: string) {
    const checkoutPage = new CheckoutPage(this.page!);
    await checkoutPage.fillLastName(lastName);
    await checkoutPage.fillPostalCode(postalCode);
    // Intentionally skip firstName
    await this.page!.waitForTimeout(500);
  }
);

When('acesez pagina de checkout overview', async function (this: PlaywrightWorld) {
  const checkoutOverviewPage = new CheckoutOverviewPage(this.page!);
  await checkoutOverviewPage.waitForPageLoad();
});

Then('ar trebui să fiu pe pagina de checkout', async function (this: PlaywrightWorld) {
  const checkoutPage = new CheckoutPage(this.page!);
  const isLoaded = await checkoutPage.isLoaded();
  if (!isLoaded) {
    throw new Error('Checkout page is not loaded');
  }
});

Then('ar trebui să văd pagina de overview', async function (this: PlaywrightWorld) {
  const checkoutOverviewPage = new CheckoutOverviewPage(this.page!);
  const isLoaded = await checkoutOverviewPage.isLoaded();
  if (!isLoaded) {
    throw new Error('Checkout overview page is not loaded');
  }
});

Then('ar trebui să văd produsul în lista de comenzi', async function (this: PlaywrightWorld) {
  const checkoutOverviewPage = new CheckoutOverviewPage(this.page!);
  const itemCount = await checkoutOverviewPage.getCartItemCount();
  if (itemCount === 0) {
    throw new Error('No items in order list');
  }
});

Then('ar trebui să văd mesajul de succes {string}', async function (this: PlaywrightWorld, expectedMessage: string) {
  const checkoutCompletePage = new CheckoutCompletePage(this.page!);
  await checkoutCompletePage.waitForPageLoad();
  const isVisible = await checkoutCompletePage.isSuccessMessageVisible(expectedMessage);
  if (!isVisible) {
    throw new Error(`Success message "${expectedMessage}" is not visible`);
  }
});

Then('comanda ar trebui să fie finalizată', async function (this: PlaywrightWorld) {
  const checkoutCompletePage = new CheckoutCompletePage(this.page!);
  const isLoaded = await checkoutCompletePage.isLoaded();
  if (!isLoaded) {
    throw new Error('Checkout complete page is not loaded');
  }
});

Then('ar trebui să văd un mesaj de eroare {string} la checkout', async function (this: PlaywrightWorld, expectedError: string) {
  const checkoutPage = new CheckoutPage(this.page!);
  const isErrorVisible = await checkoutPage.isErrorVisible();
  if (!isErrorVisible) {
    throw new Error('Error message is not visible');
  }
  const errorMessage = await checkoutPage.getErrorMessage();
  if (!errorMessage.includes('First Name')) {
    throw new Error(`Error message does not match expected: ${errorMessage}`);
  }
});

Then('ar trebui să văd un mesaj de eroare la checkout', async function (this: PlaywrightWorld) {
  const checkoutPage = new CheckoutPage(this.page!);
  const isErrorVisible = await checkoutPage.isErrorVisible();
  if (!isErrorVisible) {
    throw new Error('Error message is not visible');
  }
});

Then('subtotal-ul ar trebui să fie {string}', async function (this: PlaywrightWorld, expectedSubtotal: string) {
  const checkoutOverviewPage = new CheckoutOverviewPage(this.page!);
  const subtotal = await checkoutOverviewPage.getSubtotal();
  if (!subtotal.includes(expectedSubtotal.replace('$', ''))) {
    throw new Error(`Subtotal ${subtotal} does not match expected ${expectedSubtotal}`);
  }
});

Then('tax-ul ar trebui să fie calculat corect', async function (this: PlaywrightWorld) {
  const checkoutOverviewPage = new CheckoutOverviewPage(this.page!);
  const tax = await checkoutOverviewPage.getTax();
  if (!tax || tax === '') {
    throw new Error('Tax is not displayed');
  }
});

Then('total-ul final ar trebui să fie corect', async function (this: PlaywrightWorld) {
  const checkoutOverviewPage = new CheckoutOverviewPage(this.page!);
  const total = await checkoutOverviewPage.getTotal();
  if (!total || total === '') {
    throw new Error('Total is not displayed');
  }
});

