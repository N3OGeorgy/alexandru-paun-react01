import { useContext, useMemo, useState } from 'react';
import { AppContext } from '../contexts/AppContext';
import MetaImage from "../legacy/MetaImage";
import Dialog from './Dialog';
import ProductDetails from "./ProductDetails";

export const Product = () => {
  const { dispatch, state } = useContext(AppContext);
  const { selected: product, cart} = state;

  // const productInCart = cart.find((cartItem) => {
  //   return cartItem.name === product.name;
  // }) ? true : false;

  const productInCart = useMemo(() => {
    return Boolean(
      cart.find((cartItem) => {
        return cartItem.name === product.name;
      })
    );
  }, [cart, product.name])
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const navigateHome = () => {
    dispatch({
        type: 'setScreen',
        payload: 'home',
    })

    dispatch({
      type: 'setSelected',
      payload: null,
    })
  };

  const navigateToCart = () => {
    dispatch({
      type: 'setScreen',
      payload: 'cart'
    })
  }

  const addToCart = () => {
    dispatch({
      type: 'addToCart',
      payload: product,
    });

    setIsDialogOpen(true);
  };

  const removeToCart = () => {
    dispatch({
      type: 'removeFromCart',
      payload: product
    })
  }

  return <section className="row">
    <div className="col-12 mb-4 d-flex justify-content-between">
      <h2>{product.name}</h2>
      <buttton type="button" className="btn btn-sm btn-outline-warning" title="Go back" onClick={navigateHome}>
        Home
      </buttton>
    </div>

    <div className="col-12 mb-4 text-center">
      <MetaImage term={product.name}></MetaImage>
    </div>

    <div className="col-12 mb-4">
      <h5 className="mb-2">Specifications</h5>
      <ProductDetails product={product}></ProductDetails>
    </div>

    <div className="col-12 col-md-6 offset-md-3 d-flex justify-content-between">
      <buttton type="button" className="btn btn-outline-warning flex-grow-1 me-2" title="Go back" onClick={navigateHome}>
        Home
      </buttton>

      <button className="btn btn-warning btn-xl flex-grow-1" title={`Add ${product.name} to cart`} type="button"
      onClick={() => {
        productInCart ? removeToCart() : addToCart();
      }}
      >{productInCart ? `Remove from Cart` : `Add to cart (${product.cost_in_credits})`}</button>
    </div>

    <Dialog show={isDialogOpen} onClose={() => {
      setIsDialogOpen(false);
    }}>
      <div className="alert alert-success">
        {product.name} ({product.cost_in_credits}) added to cart.
      </div>
      <div className="d-flex justify-content-between mt-6">
        <button className="btn btn-secondary btn-sm" type="button" title="See Cart" onClick={navigateToCart}>See Cart</button>
        <button className="btn btn-secondary btn-sm" type="button" title="Continue Shopping" onClick={navigateHome}>Continue Shopping</button>
      </div>

      <div className="text-end mt-2">
        <button className="btn btn-danger btn-xl" type="button" title="CLOSE" onClick={() => {
          setIsDialogOpen(false)
        }}>Close</button>
      </div>
    </Dialog>
    </section>;
}

export default Product;
