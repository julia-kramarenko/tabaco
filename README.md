# tabaco
# 🧪 Playwright Test Suite

This repository contains one test to add to shopping cart built with [Playwright](https://playwright.dev/) using TypeScript/JavaScript.

## 🚀 Prerequisites

- Node.js (v14+ recommended)
- npm (v6+)

## 📦 Installation

Install dependencies and download necessary browser binaries:

```bash
npm install
npx playwright install
```
## How to run test different browser and projects
To run in chrome browser:
```bash
npm run test:chrome
```
To run in firefox browser
```bash
npm run test:firefox
```
To run such different browser in confg file there are different projects which can be configured
## How to open report after run

```bash
npm run report
```
## 🛠 Custom Playwright Fixtures

This project uses a custom Playwright test fixture `shopTest` defined in `tests/fixtures/shopTest.ts`. It extends the base Playwright test with additional context objects to simplify test writing for the e-commerce application.

### 🔧 Custom Fixtures Available

- `app: Application`  
  Base application instance initialized with Playwright's `page`.

- `devicePage: DevicePage`  
  Navigates to a product device page (defaults to device SKU `ploom-x-advanced`).

- `shoppingCart: ShoppingCartPage`  
  Opens the shopping cart.

- `testOptions.device: string`  
  Allows configuring which device SKU to use in the test (default: `"ploom-x-advanced"`).

---

### ▶️ Using the Fixture in Your Tests

Import `shopTest` instead of the default `test`:

```ts
import { shopTest as test, expect } from '../fixtures/shopTest';

test('can add device to cart', async ({ devicePage, shoppingCart }) => {
  await devicePage.addToCart();
  expect(await shoppingCart.getItemCount()).toBe(1);
});
