import Products from "./Products";
import Product from "./Product";
import SearchResults from "./SearchResults";
import Cart from "./Cart";
import Checkout from "./Checkout";
import OrderConfirmation from "./OrderConfirmation";
import Page404 from "./404";

const componentMap = {
  home: Products,
  productPage: Product,
  searchResults: SearchResults,
  cart: Cart,
  checkout: Checkout,
  orderConfirmation: OrderConfirmation,
  page404: Page404,
};

export const Screen = ({screen}) => {
  if(!screen || typeof componentMap[screen] === 'undefined'){
    return <componentMap.page404></componentMap.page404>;
  }
  const CurrentComponent = componentMap[screen];
  return <CurrentComponent></CurrentComponent>;
}

export default Screen;
