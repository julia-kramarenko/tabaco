import { Page } from "playwright";
import { ShopDevicesPage } from "./pages/shopDevicesPage";
import { ShoppingCartPage } from "./pages/shoppingCart";

export class Application {
  constructor(protected page: Page) { }
  public shopDevices: ShopDevicesPage = new ShopDevicesPage(this.page);
  public shoppingCart: ShoppingCartPage = new ShoppingCartPage(this.page);
}