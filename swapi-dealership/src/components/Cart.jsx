import {useContext} from "react";
import {AppContext} from "../contexts/AppContext";
import CartTotals from "./CartTotals";

export const Cart = () => {
  const {state, dispatch} = useContext(AppContext);
  const { cart } = state;

  const navigateToCheckout = () => {
    dispatch({
      type: 'setScreen',
      payload: 'checkout'
    })
  }

  if(cart.length <= 0) {
    dispatch({
      type: 'setScreen',
      payload: 'home'
    })
  }

  return <section className="row">
    <header className="col-12">
      <h2>Cart</h2>
    </header>

    <div className="col-12 mb-4">
      <CartTotals cart={cart}></CartTotals>
    </div>

    <div className="col-12 text-center">
      <button className="btn btn-warning" type="button" title="Checkout" onClick={navigateToCheckout}>Proceed to checkout</button>
    </div>
  </section>
}

export default Cart;
