import {useContext} from "react";
import {AppContext} from "../contexts/AppContext";
import CartTotals from "./CartTotals";
import CheckoutForm from "./CheckoutForm";

export const Checkout = () => {
  const {state, dispatch} = useContext(AppContext);
  const { cart } = state;

  const placeOrder = (formData) => {
    console.log(formData);
    dispatch({
      type: 'setOrder',
      payload: {
        address: formData,
        items: [...cart],
      }
    });

    dispatch({
      type: 'setScreen',
      payload: 'orderConfirmation'
    });

    dispatch({
      type: 'emptyCart',
    });
  }

  return (
    <section className="row">
      <header className="col-12 mb-4">
        <h2>Checkout</h2>
      </header>

      <section className="col-12 col-md-8">
        <CheckoutForm onSubmit={(formData) => {
          placeOrder(formData);
        }}></CheckoutForm>
      </section>

      <footer className="col-12 col-md-4">
        <CartTotals cart={cart}></CartTotals>
      </footer>
    </section>
  );
}

export default Checkout;
