import { PageHolder } from "./abstractClasses";
import { HomePage } from "./pages/homePage";
import { ShopDevicesPage } from "./pages/shopDevicesPage";
import { ShoppingCartPage } from "./pages/shoppingCart";

export class Application extends PageHolder {
  public home: HomePage = new HomePage(this.page);
  public shopDevices: ShopDevicesPage = new ShopDevicesPage(this.page);
  public shoppingCart: ShoppingCartPage = new ShoppingCartPage(this.page);
}